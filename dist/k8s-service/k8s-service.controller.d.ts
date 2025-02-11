import { KubernetesService } from './k8s-service.service';
export declare class KubernetesController {
    private readonly kubernetesService;
    constructor(kubernetesService: KubernetesService);
    initializeK8s({ name, image, port }: {
        name: string;
        image: string;
        port: number;
    }): Promise<any>;
    createDeployment({ name, image }: {
        name: string;
        image: string;
    }): Promise<string>;
    createService({ name, port }: {
        name: string;
        port: number;
    }): Promise<string>;
    createIngress({ name, host }: {
        name: string;
        host: string;
    }): Promise<string>;
}
