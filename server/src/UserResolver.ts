import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { compare, hash } from 'bcryptjs';
// require('dotenv').config();

// importing entities
import { User } from './entity/User';

// import user context
import { UserContext } from './UserContext';

// importing helper functions
import { createAccessToken, createRefreshToken } from './helper/auth';

// import middlewares
import { isAuth } from './middleware/isAuth';
import { sendRefreshToken } from './helper/sendRefreshToken';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';

@ObjectType()
class LoginResponse {
  @Field()
  message: string;

  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User)
  async userById(@Arg('id') id: string) {
    return User.findOne(id);
  }

  // protected route
  @Query(() => String)
  @UseMiddleware(isAuth)
  protectedRoute(@Ctx() { payload }: UserContext) {
    return `You are logged in! Your User ID is : ${payload!.userId}`;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: UserContext) {
    const authorization = context.req.headers['authorization'];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(' ')[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => String)
  async register(
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({ username, email, password: hashedPassword });
    } catch (error) {
      console.log(error);
      return "User couldn't be created at this moment. Something went wrong!";
    }

    return `User ${username} created!`;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: UserContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw new Error("Couldn't find user!");
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new Error('Invalid email or password!');
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      message: 'User successfully logged in!',
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForAUser(@Arg('userId', () => Int) userId: number) {
    getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1);

    return true;
  }
}
