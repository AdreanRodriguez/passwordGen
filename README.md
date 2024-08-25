# Password Generator Lambda Function

This AWS Lambda function generates a random password based on parameters passed via URL query strings.
The user can specify the length of the password and whether it should include uppercase letters, lowercase letters, numbers, and symbols. 
If no parameters are provided, all character sets are included by default.

## Features:

* len: Length of the password (must be between 8 and 30 characters).
* cap: Include uppercase letters (true/false).
* low: Include lowercase letters (true/false).
* num: Include numbers (true/false).
* sym: Include symbols (true/false).

The function validates the length of the password and ensures that at least one character set is selected. If the parameters do not meet the requirements, an error message is returned. Otherwise, a password is generated and shuffled using the Fisher-Yates algorithm.
