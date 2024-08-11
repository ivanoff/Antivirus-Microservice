import requests

class AntivirusMicroservice:
    def __init__(self, base_url='http://localhost:3000'):
        self.base_url = base_url

    def check_file(self, file_path):
        """
        Check a file for viruses using the Antivirus Microservice.

        :param file_path: Path to the file to be checked
        :return: A dictionary with 'ok' (boolean) and 'viruses' (list of strings, if any)
        """
        try:
            with open(file_path, 'rb') as file:
                files = {'file': file}
                response = requests.post(self.base_url, files=files)
                response.raise_for_status()  # Raise an exception for bad status codes
                return response.json()
        except requests.RequestException as e:
            print(f"Error checking file: {e}")
            return {'ok': False, 'viruses': ['Error checking file']}

# Usage example
if __name__ == "__main__":
    antivirus = AntivirusMicroservice()
    result = antivirus.check_file('path/to/your/file.txt')
    if result['ok']:
        print("File is clean")
    else:
        print(f"File is infected: {result['viruses']}")
