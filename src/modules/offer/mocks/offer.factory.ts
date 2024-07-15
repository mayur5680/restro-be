export class OfferFactory {
  static getOffer() {
    return {
      data: {
        id: '06e50abf-1632-43f1-9b38-82f18f3d9851',
        name: 'dummy offer',
        masterCouponId: null,
        hook: 'OFFER',
        offerType: 'PRODUCT',
        userType: 'REGISTERED',
        startDate: '2024-02-14T13:00:00.000Z',
        endDate: '2024-02-15T13:00:00.000Z',
        status: 'INACTIVE',
        triggerType: null,
        createdAt: '2024-02-21T23:23:54.000Z',
        createdBy: 1,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
        oneOff: 1,
        byOrder: 0,
        byStore: 0,
        byPostCode: 0,
        byState: 0,
        priority: 0,
        rewardTypeId: null,
        offerAttributes: {
          id: '6546fcb0-a47c-4e12-9524-955e77606f2a',
          offerId: '06e50abf-1632-43f1-9b38-82f18f3d9851',
          offerDetails: {
            offerBrackets: [
              {
                rewardId: 1002,
                triggers: [
                  {
                    criteria: 'minOrderValue',
                    condition: 'basketTotal',
                    sourceItems: [],
                    minimumOrderValue: '0',
                  },
                ],
                application: 'allMatching',
                shouldMultiply: false,
                shouldDiscountSourceItems: 0,
                reward: {
                  id: 1002,
                  name: 'dummy offer',
                  properties: [
                    {
                      type: 'LOYALTY',
                      config: 'multiplier',
                      isDefault: 1,
                      multiplier: '2',
                      rewardType: 'GYGPOINTS',
                      description: 'frfr',
                      discountType: 'NON-DISCOUNTING',
                      multiplierCriteria: 'basketTotal',
                      notAvailableDescription: 'frfr',
                    },
                  ],
                  type: 'LOYALTY',
                  discountType: 'NON-DISCOUNTING',
                },
              },
            ],
            bracketApplication: 'all',
          },
          merchandiseId: null,
          menuContainerId: null,
          menuContainerProductId: null,
          minQuantity: null,
          minValue: 1,
          minSpendByMenuContainerId: null,
          minSpendByMenuContainerProductId: null,
          claimedLimitUnit: null,
          displayText: null,
          claimedUnitValue: null,
          maxAllowedPerOrder: 100,
          maxAllowedPerUser: 100,
          isActive: 1,
          createdAt: '2024-02-21T23:23:54.000Z',
          createdBy: null,
          updatedAt: '2024-02-21T23:23:54.000Z',
          updatedBy: null,
          deletedAt: null,
        },
        stores: [
          {
            id: 899,
            name: 'Mount Lawley',
          },
        ],
        storesOffers: [
          {
            id: 899,
            name: 'Mount Lawley',
          },
        ],
      },
    };
  }
}
