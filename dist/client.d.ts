declare class Antivirus {
    private baseUrl;
    constructor(baseUrl?: string);
    checkFile(file: File | Blob): Promise<AntivirusResponse>;
}
export default Antivirus;
interface AntivirusResponse {
    ok: boolean;
    viruses?: string[];
    error?: string;
}
//# sourceMappingURL=client.d.ts.map