![antivirus-microservice](./assets/logo2.png)

## Antivirus Microservice

This is a free and fully functional microservice for antivirus file checking using `ClamAV`. The service is written in `TypeScript` and uses `Bun` as the runtime environment.

## Features

- `Free` solution for `antivirus file scanning`
- Uses the reliable and widely adopted `ClamAV` antivirus engine
- Easy deployment with `Docker`
- Simple `RESTful API` for file upload and scanning
- Automatic waiting for `ClamAV` to start up

## Table of Contents

- [Antivirus Microservice](#antivirus-microservice)
- [Features](#features)
- [Table of Contents](#table-of-contents)
- [Antivirus Microservice Client](#antivirus-microservice-client)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API](#api)
  - [Notes](#notes)
- [Antivirus Microservice Server](#antivirus-microservice-server)
  - [Requirements](#requirements)
  - [Installation and Running](#installation-and-running)
  - [Usage](#usage-1)
    - [Scanning a File](#scanning-a-file)
    - [Checking a File with a Virus](#checking-a-file-with-a-virus)
  - [Notes](#notes-1)
- [License](#license)
- [Contributing](#contributing)
- [Support](#support)
- [Created by](#created-by)

## Antivirus Microservice Client

This client provides a simple interface to interact with the Antivirus Microservice. It allows you to easily scan files for viruses using the ClamAV engine.

See [Antivirus Microservice Server](#antivirus-microservice-server) section to set up the server.

### Installation

To install the Antivirus Microservice client, use npm:

```bash
npm i -S antivirus-microservice
```

### Usage

Here's a basic example of how to use the Antivirus Microservice client:

```typescript
import Antivirus from 'antivirus-microservice';

// Initialize the client with the server URL
const antivirus = new Antivirus('http://localhost:3000');

// For example: Create a test file (this is the EICAR test virus file)
const file = new File(['X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*'], 'test.txt', { type: 'text/plain' });

// Check the file
const { ok, viruses } = await antivirus.checkFile(file);

// Log the result
console.log(ok? 'File is clean' : `File is infected: ${viruses}`);
// Result> File is infected: Win.Test.EICAR_HDB-1
```

In this example, we're creating a file with the EICAR test virus signature. This is a standard test file used to verify that antivirus software is working correctly. When scanned, it should be detected as a virus.

### API

The `Antivirus` class provides the following method:

- `checkFile(file: File | Blob): Promise<{ ok: boolean, viruses?: string[], error?: string }>`
  
  Scans the provided file for viruses. Returns a promise that resolves to an object with:
  - `ok`: boolean indicating whether the file is clean (`true`) or infected (`false`)
  - `viruses`: an array of detected virus names (only present if `ok` is `false`)
  - `error`: a string with error (only present if `ok` is `false`)

### Notes

- Make sure the Antivirus Microservice server is running and accessible at the URL you provide when initializing the `Antivirus` client.
- The client works with both `File` and `Blob` objects, making it flexible for various use cases.
- Error handling is built into the client. If there's an error communicating with the server, the `checkFile` method will return `{ ok: false, viruses: ['Error checking file'] }`.

For more information on setting up and using the server, refer to the [Antivirus Microservice Server](#antivirus-microservice-server) documentation below.

## Antivirus Microservice Server

### Requirements

- Docker
- Docker Compose

### Installation and Running

1. Clone the repository:
   ```
   git clone https://github.com/ivanoff/antivirus-microservice.git
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

### Usage

The service provides a single endpoint for uploading and scanning files.

#### Scanning a File

Send a POST request to `http://localhost:3000` with the `file` in a multipart/form-data form.

Example of checking a file without a virus:

```bash
curl -X POST http://localhost:3000 -F "file=@Dockerfile"
```

Response:
```json
{"ok":true}
```

#### Checking a File with a Virus

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

### Notes

- The service automatically deletes scanned files after scanning.
- In case of an error during file upload or scanning, the service will return an appropriate error message.

## License

This project is distributed under the `MIT` license. See the [LICENSE](./LICENSE) file for more information.

Please note that `ClamAV` is licensed under the Apache 2.0 license. More details can be found [here](https://github.com/bcgov/clamav/blob/master/LICENSE)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support

If you encounter any problems or have questions, please open an issue in the project repository.

## Created by

Dimitry Ivanov <2@ivanoff.org.ua> # curl -A cv ivanoff.org.ua

