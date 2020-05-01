# Virtual Assistance using SMS and Whatsapp

The main purpose of this app is to connect people who do not have access to internet or smartphones with power Apis and other services such as online fund transfers and online shopping. This app has three services which are:

- FundTransfer
- FoodAtHome
- Online Shopping

## Run this App

In order to run this app, clone this repo using git.

`git clone https://github.com/alinauroz/virtual_assitance.git`

Then install dependencies using

`npm i`

You will also need to add your Twilio AuthToken, ID and phone numbers to .env file. To start app, run

`node index.js`

You can check this app locally using Postman. To check this working in real, deploy it and register webook hook on twilio sms and whatsapp service. Webhooks for sms is `yourwebsite.com/sms` and whatsapp is `yourwebsite.com/whatsapp`

## Use this app

Goto `/dashboard` to view live updates.

![Demo](https://github.com/alinauroz/dev_post/blob/master/latest-ft.gif?raw=true)

To use this app send message to either your Twilio number or the whatsapp number that Twilio has given you. Below is a procesure to use these services.

### FundTransfer

_For Help:_ send `fundtransfer help` to your Twilio number

_To Transfer Fund:_ send `fundtransfer <Recipient's Phone Number> <Amount>` to your Twilio number 

### Shopping

_For Help:_ send `shopping help` to your Twilio number

_To View List of Items:_ send `shopping list` to your Twilio number

_To Purchase an Item:_ send `shopping <Product Id>` to your Twilio number

### FoodAtHome

_For Help:_ send `foodathome help` to your Twilio number

_To Register:_ send `foodathome <no. of people>` to your Twilio number

_All other requirements such as home address, cnic, user's balance etc will be retrieved using user's phone number_




