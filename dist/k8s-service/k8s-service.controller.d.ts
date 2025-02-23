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
    }): Promise<{
        success: boolean;
        message: any;
    }>;
    createService({ name, port }: {
        name: string;
        port: number;
    }): Promise<{
        success: boolean;
        message: any;
    }>;
    createIngress({ name, host }: {
        name: string;
        host: string;
    }): Promise<{
        success: boolean;
        message: any;
    }>;
    downK8s({ name }: {
        name: string;
    }): Promise<any>;
    getDeployments(): Promise<any>;
    getServices(): Promise<any>;
    getIngresses(): Promise<any>;
    getPods(): Promise<any>;
}
