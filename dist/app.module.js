"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const house_module_1 = require("./house/house.module");
const logger_middleware_1 = require("./common/middleswares/logger/logger.middleware");
const mail_module_1 = require("./mail/mail.module");
const review_module_1 = require("./review/review.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({
            path: '/api/house/create',
            method: common_1.RequestMethod.POST
        });
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({
            path: '/api/house/update/:id',
            method: common_1.RequestMethod.PUT
        });
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({
            path: '/api/house/delete/:id',
            method: common_1.RequestMethod.DELETE
        });
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({
            path: "api/auth/update",
            method: common_1.RequestMethod.PUT
        });
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({
            path: "api/auth/chnage-password",
            method: common_1.RequestMethod.PUT
        });
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({
            path: "api/review/post",
            method: common_1.RequestMethod.POST
        });
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({
            path: "api/house/user",
            method: common_1.RequestMethod.GET
        });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({
                global: true,
                secret: "runabinteanamul",
                signOptions: {}
            }), user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: "btnlkjfeqjfj0gvsdcc0-mysql.services.clever-cloud.com",
                port: 3306,
                username: "u9esawecvdnwauqf",
                password: "qGdCimsddDefTPS6nFsL",
                database: "btnlkjfeqjfj0gvsdcc0",
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
            }),
            house_module_1.HouseModule,
            mail_module_1.MailModule,
            review_module_1.ReviewModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map