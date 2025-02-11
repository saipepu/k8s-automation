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
const k8s_service_module_1 = require("./k8s-service/k8s-service.module");
const k8s_service_controller_1 = require("./k8s-service/k8s-service.controller");
const k8s_service_service_1 = require("./k8s-service/k8s-service.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [k8s_service_module_1.K8sServiceModule],
        controllers: [app_controller_1.AppController, k8s_service_controller_1.KubernetesController],
        providers: [app_service_1.AppService, k8s_service_service_1.KubernetesService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map