import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import type { CerebroProductService } from '../cerebro-product/cerebro-product.service';
import type { CerebroProductCompanyService } from '../cerebro-product-company/cerebro-product-company.service';

@Injectable()
export class CerebroLazyLoadService {
  private cerebroProductService: CerebroProductService;
  private cerebroProductCompanyService: CerebroProductCompanyService;
  private inititialized = false;
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  public async init() {
    if (this.inititialized) {
      return;
    }
    const { CerebroProductModule } = await import(
      '../cerebro-product/cerebro-product.module'
    );
    const { CerebroProductCompanyModule } = await import(
      '../cerebro-product-company/cerebro-product-company.module'
    );
    const cerebroProductModuleRef = await this.lazyModuleLoader.load(
      () => CerebroProductModule,
    );
    const cerebroProductCompanyModuleRef = await this.lazyModuleLoader.load(
      () => CerebroProductCompanyModule,
    );

    const { CerebroProductService } = await import(
      '../cerebro-product/cerebro-product.service'
    );
    const { CerebroProductCompanyService } = await import(
      '../cerebro-product-company/cerebro-product-company.service'
    );

    this.cerebroProductService =
      cerebroProductModuleRef.get<CerebroProductService>(CerebroProductService);
    this.cerebroProductCompanyService =
      cerebroProductCompanyModuleRef.get<CerebroProductCompanyService>(
        CerebroProductCompanyService,
      );
    this.inititialized = true;
  }

  public get() {
    return {
      cerebroProductService: this.cerebroProductService,
      cerebroProductCompanyService: this.cerebroProductCompanyService,
    };
  }
}
