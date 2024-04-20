const fs = require('fs');
const path = require('path');

const sharedData = {
    words: [],
    error: 'No Error',
    chars: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
};

fs.readFile(path.join(__dirname, '/words.json'), 'utf8', (err, data) => {
    if (err) {
        sharedData.error = JSON.stringify(err);
        return;
    }
    sharedData.words = JSON.parse(data);
});




module.exports.templateTags = [
    {
        name: 'GibberText',
        displayName: 'Gibber Text',
        description: 'Creates a meaningless text using random words.',
        args: [
            {
                displayName: 'Number Of Words In Text',
                description: 'Number Of Words In Text',
                type: 'number',
                defaultValue: 20
            },
            {
                displayName: 'Character Length Limitation',
                description: 'The resulting text would not be longer than this value. 0 would remove limitation',
                type: 'number',
                defaultValue: 0
            },
        ],
        async run(context, words, characters) {


            var text = '';
            var sep = '';

            for (let i = 0; i < words; i++) {

                let index = Math.random() * (sharedData.words.length + 1);

                index = Math.round(index);

                if (index < 0) {

                    index = 0;
                }

                if (index >= sharedData.words.length) {

                    index = sharedData.words.length - 1;
                }

                text += sharedData.words[index] + sep;

                sep = ' ';
            }

            if (characters > 0) {

                if (text.length > characters) {

                    text = text.substring(0, characters);
                }
            }

            return text;
        }
    },
    {
        name: 'GibberWord',
        displayName: 'Gibber Word',
        description: 'Creates a meaningless word using random characters.',
        args: [
            {
                displayName: 'World Length',
                description: 'World Length',
                type: 'number',
                defaultValue: 8
            },
            {
                displayName: 'Capital',
                description: 'First letter being upper case',
                type: 'boolean',
                defaultValue: true
            }
        ],
        async run(context, length, capital) {



            function randomChar() {

                let index = Math.random() * (sharedData.chars.length + 1);

                index = Math.round(index);

                if (index < 0) {

                    index = 0;
                }

                if (index >= sharedData.chars.length) {

                    index = sharedData.chars.length - 1;
                }

                return sharedData.chars[index];
            }


            var word = '';

            for (let i = 0; i < length - 1; i++) {

                word += randomChar();
            }

            if (capital) {

                word = randomChar().toLocaleUpperCase() + word;
            } else {
                word = randomChar() + word;
            }

            return word;
        }
    },
    {
        name: 'GibberInteger',
        displayName: 'Gibber Integer',
        description: 'Generates a random number',
        args: [
            {
                displayName: 'Minimum',
                description: 'The lower bound for generated number',
                type: 'number',
                defaultValue: 0
            },
            {
                displayName: 'Maximum',
                description: 'The upper bound for generated number',
                type: 'number',
                defaultValue: 1000
            },
        ],
        async run(context, min, max) {

            var length = max - min;

            let randomNumber = Math.random() * (length + 1);

            randomNumber = Math.round(randomNumber) + min;

            if (randomNumber < min) {

                randomNumber = min;
            }

            if (randomNumber > max) {

                randomNumber = max;
            }

            return randomNumber;
        }
    },
    {
        name: 'GibberPhoneNumber',
        displayName: 'Gibber PhoneNumber',
        description: 'Generates a random phone number',
        args: [
            {
                displayName: 'Prefix',
                description: 'Prefix',
                type: 'string',
                defaultValue: '09'
            },
            {
                displayName: 'Gibbered Digits',
                description: 'The number of digits to be appended after the prefix',
                type: 'number',
                defaultValue: 9
            },
        ],
        async run(context, prefix, length) {


            let phoneNumber = prefix;
            
            function randomDigit() {

                let index = Math.random() * (sharedData.digits.length + 1);

                index = Math.round(index);

                if (index < 0) {

                    index = 0;
                }

                if (index >= sharedData.digits.length) {

                    index = sharedData.digits.length - 1;
                }

                return sharedData.digits[index];
            }

            for (let i = 0; i < length; i++) {
                
                phoneNumber += randomDigit();
            }

            return phoneNumber;
        }
    }
];
