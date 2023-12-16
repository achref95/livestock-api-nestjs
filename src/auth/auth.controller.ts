import { Controller, UseGuards, Get, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/middleware/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupData, @Res() res) {
    try {
      const { username, password } = signupData;
      const newUser = await this.authService.signup(username, password);

      // You might want to exclude sensitive information from the response, like the password
      const userWithoutPassword = { id: newUser.id, username: newUser.username };

      return res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  }

  @Post('login')
  async login(@Body() { username, password }, @Res() res) {
    const result = await this.authService.login(username, password);

    if (result) {
      return res.status(200).json({ authToken: result.authToken });
    }

    return res.status(401).json({ message: 'Incorrect credentials' });
  }

  @Get('/verify')
  @UseGuards(JwtAuthGuard)
  async verifyToken(@Req() req, @Res() res): Promise<{ payload: any }> {
    return res.status(200).json({ payload: req.user });
  }
}
