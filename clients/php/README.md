## Antivirus Microservice Client

This is client for a free and fully functional microservice for antivirus file checking using `ClamAV`.

## Example

```php
<?php

$antivirus = new AntivirusMicroservice();
$result = $antivirus->checkFile('/path/to/your/file.txt');

if ($result['ok']) {
    echo "File is clean\n";
} else {
    echo "File is infected: " . implode(', ', $result['viruses']) . "\n";
}
```

### Notes

Make sure the Antivirus Microservice server is running and accessible at the URL you provide when initializing the `Antivirus` client.

For more information on setting up and using the server, refer to the [Antivirus Microservice Server](https://github.com/ivanoff/Antivirus-Microservice?tab=readme-ov-file#antivirus-microservice-server)

## License

This project is distributed under the `MIT` license. See the [LICENSE](./LICENSE) file for more information.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support

If you encounter any problems or have questions, please open an issue in the project repository.

## Created by

Dimitry Ivanov <2@ivanoff.org.ua> # curl -A cv ivanoff.org.ua
