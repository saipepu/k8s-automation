"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KubernetesService = void 0;
const common_1 = require("@nestjs/common");
let KubernetesService = class KubernetesService {
    async initializeK8sClient() {
        const k8s = await import('@kubernetes/client-node');
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        this.k8sApi = kc.makeApiClient(k8s.AppsV1Api);
    }
    async initializeK8sCoreV1Client() {
        const k8s = await import('@kubernetes/client-node');
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        this.k8sCoreV1Api = kc.makeApiClient(k8s.CoreV1Api);
    }
    async initializeK8sNetworkingClient() {
        const k8s = await import('@kubernetes/client-node');
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        this.k8sNetworkingApi = kc.makeApiClient(k8s.NetworkingV1Api);
    }
    async createDeployment({ name, image }) {
        if (!this.k8sApi) {
            await this.initializeK8sClient();
        }
        const deployment = {
            metadata: {
                name: `${name}`
            },
            spec: {
                selector: {
                    matchLabels: {
                        app: `${name}`
                    }
                },
                replicas: 1,
                template: {
                    metadata: {
                        labels: {
                            app: `${name}`
                        }
                    },
                    spec: {
                        containers: [
                            {
                                name: `${name}`,
                                image: `${image}`,
                            }
                        ],
                        imagePullSecrets: [
                            {
                                name: 'regcred'
                            }
                        ]
                    }
                }
            }
        };
        try {
            const response = await this.k8sApi.createNamespacedDeployment({ namespace: 'default', body: deployment });
            console.log('Yay! \nYou spawned: ' + deployment.metadata.name);
            console.log(response);
            return { success: true, message: 'K8s Deployment created successfully 🎉' };
        }
        catch (error) {
            console.error('Error creating deployment:', error);
            return { success: false, message: `Failed to create K8s Deployment: ${error}` };
        }
    }
    async createService({ name, port }) {
        if (!this.k8sCoreV1Api) {
            await this.initializeK8sCoreV1Client();
        }
        const service = {
            metadata: {
                name: `${name}`
            },
            spec: {
                selector: {
                    app: `${name}`
                },
                ports: [
                    {
                        protocol: 'TCP',
                        port: 80,
                        targetPort: Number(port)
                    }
                ],
                type: 'ClusterIP'
            }
        };
        try {
            const response = await this.k8sCoreV1Api.createNamespacedService({ namespace: 'default', body: service });
            console.log('Yay! \nYou spawned: ' + service.metadata.name);
            console.log(response);
            return { success: true, message: 'K8s Service created successfully 🎉' };
        }
        catch (error) {
            console.error('Error creating service:', error);
            return { success: false, message: `Failed to create K8s Service: ${error}` };
        }
    }
    async createIngress({ name, host }) {
        if (!this.k8sNetworkingApi) {
            await this.initializeK8sNetworkingClient();
        }
        try {
            await this.k8sNetworkingApi
                .createNamespacedIngress({
                namespace: 'default',
                body: {
                    apiVersion: 'networking.k8s.io/v1',
                    kind: 'Ingress',
                    metadata: { name: `${name}` },
                    spec: {
                        rules: [
                            {
                                host: `${host}.life-au.live`,
                                http: {
                                    paths: [
                                        {
                                            backend: {
                                                service: {
                                                    name: `${name}`,
                                                    port: { number: 80 },
                                                },
                                            },
                                            path: '/',
                                            pathType: 'Prefix',
                                        },
                                    ],
                                },
                            },
                        ],
                        ingressClassName: 'nginx',
                    },
                    status: {
                        loadBalancer: {
                            ingress: [{ ip: '188.166.199.51' }],
                        }
                    }
                },
            });
            return { success: true, message: 'K8s Ingress created successfully 🎉' };
        }
        catch (e) {
            console.error('Error creating ingress:', e);
            return { success: false, message: `Failed to create K8s Ingress: ${e}` };
        }
    }
};
exports.KubernetesService = KubernetesService;
exports.KubernetesService = KubernetesService = __decorate([
    (0, common_1.Injectable)()
], KubernetesService);
//# sourceMappingURL=k8s-service.service.js.map