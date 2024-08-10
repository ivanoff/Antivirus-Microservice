class Antivirus {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async checkFile(file: File | Blob): Promise<AntivirusResponse> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: AntivirusResponse = await response.json();
      return result;
    } catch (error) {
      return { ok: false, error: 'Error checking file' };
    }
  }
}

export default Antivirus;

interface AntivirusResponse {
  ok: boolean;
  viruses?: string[];
  error?: string;
}
