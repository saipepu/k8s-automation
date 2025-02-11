"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.K8sServiceModule = void 0;
const common_1 = require("@nestjs/common");
const k8s_service_service_1 = require("./k8s-service.service");
const k8s_service_controller_1 = require("./k8s-service.controller");
let K8sServiceModule = class K8sServiceModule {
};
exports.K8sServiceModule = K8sServiceModule;
exports.K8sServiceModule = K8sServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [k8s_service_controller_1.KubernetesController],
        providers: [k8s_service_service_1.KubernetesService],
        exports: [k8s_service_service_1.KubernetesService],
    })
], K8sServiceModule);
//# sourceMappingURL=k8s-service.module.js.map