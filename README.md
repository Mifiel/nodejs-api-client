# Mifiel

[![npm version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

NodeJS SDK for [Mifiel](https://www.mifiel.com) API.
Please read our [documentation](http://docs.mifiel.com/) for instructions on how to start using the API.

## Installation

### NPM

```
npm install mifiel --save
```

### Yarn

```
yarn add mifiel
```

## Usage

For your convenience Mifiel offers a Sandbox environment where you can confidently test your code.

To start using the API in the Sandbox environment you need to first create an account at [sandbox.mifiel.com](https://sandbox.mifiel.com).

Once you have an account you will need an APP_ID and an APP_SECRET which you can generate in [sandbox.mifiel.com/access_tokens](https://sandbox.mifiel.com/access_tokens).

Then you can configure the library with:

```javascript
import Mifiel from 'mifiel' // for ES6 and Typescript
// for ES5
var Mifiel = require('mifiel').default

Mifiel.Config.setTokens('<APP_ID>', '<APP_SECRET>')
// for sandbox use
Mifiel.Config.url = 'https://sandbox.mifiel.com/api/v1'
```

> All methods return promises

### Document methods

- Find:

```javascript
  Mifiel.Models.Document.find('id').then(doc => {
    console.log(doc)
    doc.original_hash
    doc.file
    doc.file_signed
    // ...
  })
```

- Find all:

```javascript
  Mifiel.Models.Document.all().then(docs => {
    console.log(docs)
  })
```

- Create:

> Use only **hash** if you dont want us to have the file.<br>
> Either **file** or **hash** must be provided.

```javascript
  const Document = new Mifiel.Models.Document({
    file: 'path/to/my-file.pdf',
    signatories: [
      { name: 'Signer 1', email: 'signer1@email.com', tax_id: 'AAA010101AAA' },
      { name: 'Signer 2', email: 'signer2@email.com', tax_id: 'AAA010102AAA' }
    ]
  })
  document.save().then(doc => {
    console.log(doc)
    doc.original_hash
    doc.file
    doc.file_signed
  })
  // if you dont want us to have the PDF, you can just send us 
  // the original_hash and the name of the document. Both are required
  const document = new Mifiel.Models.Document({
    hash: Digest::SHA256.hexdigest(File.read('path/to/my-file.pdf')), 
    name: 'my-file.pdf',
    signatories: [...]
  })
```

- Save Document related files

```javascript
  // save the original file
  document.saveFile('path/to/save/file.pdf').then(resp => {
    resp === true
  })
  // save the signed file (original file + signatures page)
  document.saveFileSigned('path/to/save/file-signed.pdf').then(resp => {
    resp === true
  })
  // save the signed xml file
  document.saveXml('path/to/save/xml.xml').then(resp => {
    resp === true
  })
```

- Delete

  ```javascript
    Mifiel.Models.Document.delete('id')
  ```

### Certificate methods

- Sat Certificates

  ```javascript
    Mifiel.Modesl.Certificate.sat().then(satCertificates => {
      console.log(satCertificates)
    })
  ```

- Find:

```javascript
  Mifiel.Models.Certificate.find('id').then(certificate => {
    certificate.cer_hex
    certificate.type_of
    // ...
  })
```

- Find all:

```javascript
  Mifiel.Models.Document.all().then(certs => {
    console.log(certs)
  })
```

- Create
  
  ```javascript
  const Certificate = new Mifiel.Models.Certificate({
    file: "path/to/my-certificate.cer"
  })
  certificate.save().then(cer => {
    cer.cer_hex
    cer.type_of
    // ...
  })

  ```

- Delete

  ```javascript
    Mifiel.Models.Certificate.delete('id')
  ```

User methods

- Setup Widget

  ```javascript
    const args = {
      email: 'some@email.com',
      tax_id: 'AAA010101AAA',
      callback_url: 'http://some-callback.url'
    }

    Mifiel.Models.User.setupWidget(args).then(useer => {
      user.widget_id
    })
  ```

## Contributing

1. Fork it ( https://github.com/[my-github-username]/mifiel/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

[npm-url]: https://badge.fury.io/js/mifiel
[npm-image]: https://badge.fury.io/js/mifiel.svg

[travis-image]: https://travis-ci.org/Mifiel/nodejs-api-client.svg?branch=master
[travis-url]: https://travis-ci.org/Mifiel/nodejs-api-client

[coveralls-image]: https://coveralls.io/repos/github/Mifiel/nodejs-api-client/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/Mifiel/nodejs-api-client?branch==master
