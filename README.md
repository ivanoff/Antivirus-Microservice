# Antivirus Microservice

This is a free and fully functional microservice for antivirus file checking using `ClamAV`. The service is written in TypeScript and uses Bun as the runtime environment.

## Features

- Free solution for antivirus file scanning
- Uses the reliable and widely adopted `ClamAV` antivirus engine
- Easy deployment with Docker
- Simple RESTful API for file upload and scanning
- Automatic waiting for `ClamAV` to start up

## Requirements

- Docker
- Docker Compose

## Installation and Running

1. Clone the repository:
   ```
   git clone https://github.com/your-username/antivirus-microservice.git
   cd antivirus-microservice
   ```

2. Build the Docker image:
   ```
   sudo docker compose build
   ```

3. Start the service:
   ```
   sudo docker compose up
   ```

During startup, the service will attempt to connect to ClamAV every 5 seconds, outputting messages like:
```
[2024-08-10T11:26:40.001Z] Waiting for ClamAV on port 3310 (1/20)
[2024-08-10T11:26:45.009Z] Waiting for ClamAV on port 3310 (2/20)
```

After successful startup, you will see the message:
```
[2024-08-10T11:27:05.038Z] Service started on 3000 port
```

## Usage

The service provides a single endpoint for uploading and scanning files.

### Scanning a File

Send a POST request to `http://localhost:3000` with the `file` in a multipart/form-data form.

Example of checking a file without a virus:

```bash
curl -X POST http://localhost:3000 -F "file=@Dockerfile"
```

Response:
```json
{"ok":true}
```

### Checking a File with a Virus

To demonstrate working with an infected `file`, first create a test virus:

```bash
base64 -d virus.txt.base64 > virus.txt
```

Then send the file for scanning:

```bash
curl -X POST http://localhost:3000 -F "file=@virus.txt"
```

Response:
```json
{"ok":false,"viruses":["Eicar-Signature"]}
```

## Notes

- The service automatically deletes scanned files after scanning.
- In case of an error during file upload or scanning, the service will return an appropriate error message.

## License

This project is distributed under the MIT license. See the [LICENSE](./LICENSE) file for more information.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support

If you encounter any problems or have questions, please open an issue in the project repository.
