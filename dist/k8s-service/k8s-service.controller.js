"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KubernetesController = void 0;
const common_1 = require("@nestjs/common");
const k8s_service_service_1 = require("./k8s-service.service");
let KubernetesController = class KubernetesController {
    constructor(kubernetesService) {
        this.kubernetesService = kubernetesService;
    }
    async initializeK8s({ name, image, port }) {
        if (name === undefined || image === undefined || port === undefined)
            throw new common_1.BadRequestException('Invalid Request, Parameters missing');
        const deployment = await this.kubernetesService.createDeployment({
            name: name,
            image: image,
        });
        console.log(deployment);
        if (!deployment.success)
            throw new common_1.BadRequestException(deployment.message);
        const service = await this.kubernetesService.createService({
            name: name,
            port: port,
        });
        console.log(service);
        if (!service.success)
            throw new common_1.BadRequestException(service.message);
        const ingress = await this.kubernetesService.createIngress({
            name: name,
            host: name,
        });
        console.log(ingress);
        if (!ingress.success)
            throw new common_1.BadRequestException(ingress.message);
        return {
            success: true,
            message: `Kubernetes Deployment Successfull! \n🚀 App link => http://${name}.life-au.live`,
        };
    }
    async createDeployment({ name, image }) {
        try {
            const result = await this.kubernetesService.createDeployment({
                name: name,
                image: image,
            });
            return {
                success: true,
                message: result,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error,
            };
        }
    }
    async createService({ name, port }) {
        try {
            const result = await this.kubernetesService.createService({
                name: name,
                port: port,
            });
            return {
                success: true,
                message: result,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error,
            };
        }
    }
    async createIngress({ name, host }) {
        try {
            const result = await this.kubernetesService.createIngress({
                name: name,
                host: host,
            });
            return {
                success: true,
                message: result,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error,
            };
        }
    }
    async downK8s({ name }) {
        try {
            const result = await this.kubernetesService.deleteK8sResources({
                name: name,
            });
            return {
                success: true,
                message: result,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async getDeployments() {
        try {
            const result = await this.kubernetesService.getDeployments();
            return {
                success: true,
                message: result,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error,
            };
        }
    }
    async getServices() {
        try {
            const result = await this.kubernetesService.getServices();
            return {
                success: true,
                message: result,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error,
            };
        }
    }
    async getIngresses() {
        try {
            const result = await this.kubernetesService.getIngresses();
            return {
                success: true,
                message: result,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error,
            };
        }
    }
    async getPods() {
        try {
            const result = await this.kubernetesService.getPods();
            return {
                success: true,
                message: result,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error,
            };
        }
    }
};
exports.KubernetesController = KubernetesController;
__decorate([
    (0, common_1.Post)('initialize'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KubernetesController.prototype, "initializeK8s", null);
__decorate([
    (0, common_1.Post)('create-deployment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KubernetesController.prototype, "createDeployment", null);
__decorate([
    (0, common_1.Post)('create-service'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KubernetesController.prototype, "createService", null);
__decorate([
    (0, common_1.Post)('create-ingress'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KubernetesController.prototype, "createIngress", null);
__decorate([
    (0, common_1.Delete)('down'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KubernetesController.prototype, "downK8s", null);
__decorate([
    (0, common_1.Get)('deployments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KubernetesController.prototype, "getDeployments", null);
__decorate([
    (0, common_1.Get)('services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KubernetesController.prototype, "getServices", null);
__decorate([
    (0, common_1.Get)('ingresses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KubernetesController.prototype, "getIngresses", null);
__decorate([
    (0, common_1.Get)('pods'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KubernetesController.prototype, "getPods", null);
exports.KubernetesController = KubernetesController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [k8s_service_service_1.KubernetesService])
], KubernetesController);
//# sourceMappingURL=k8s-service.controller.js.map