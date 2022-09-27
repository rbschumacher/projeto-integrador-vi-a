import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { parse } from 'url';

import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  async handler(req: Request, res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query);
  }

  @Get('login')
  public async showLogin(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    const serverSideProps = { dataFromController: '123' };

    await this.viewService
      .getNextServer()
      .render(
        req,
        res,
        parsedUrl.pathname,
        Object.assign(parsedUrl.query, serverSideProps),
      );
  }

  @Get('cozinha')
  public async showKitchen(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    const serverSideProps = { dataFromController: '123' };

    await this.viewService
      .getNextServer()
      .render(
        req,
        res,
        parsedUrl.pathname,
        Object.assign(parsedUrl.query, serverSideProps),
      );
  }

  @Get('pedido')
  public async showOrder(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    const serverSideProps = { dataFromController: '123' };

    await this.viewService
      .getNextServer()
      .render(
        req,
        res,
        parsedUrl.pathname,
        Object.assign(parsedUrl.query, serverSideProps),
      );
  }

  @Get('pedido/pagamento')
  public async showOrderPayment(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    const serverSideProps = { dataFromController: '123' };

    await this.viewService
      .getNextServer()
      .render(
        req,
        res,
        parsedUrl.pathname,
        Object.assign(parsedUrl.query, serverSideProps),
      );
  }

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query);
  }
}
