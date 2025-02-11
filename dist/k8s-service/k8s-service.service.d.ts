export declare class KubernetesService {
    private k8sApi;
    private k8sCoreV1Api;
    private k8sNetworkingApi;
    initializeK8sClient(): Promise<void>;
    initializeK8sCoreV1Client(): Promise<void>;
    initializeK8sNetworkingClient(): Promise<void>;
    createDeployment({ name, image }: {
        name: string;
        image: string;
    }): Promise<any>;
    createService({ name, port }: {
        name: string;
        port: number;
    }): Promise<any>;
    createIngress({ name, host }: {
        name: string;
        host: string;
    }): Promise<any>;
}
