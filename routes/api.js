const express = require('express')
const router = express.Router()
const request = require('request')
const url = require('url')
const { WalletServiceClient, Credentials } = require('@trinsic/service-clients')
require('dotenv').config()

// create the wallet service client using the organization access token pasted to the .env file
const client = new WalletServiceClient(
  new Credentials(process.env.ACCESS_TOKEN),
  { noRetryPolicy: true }
)

// creates a wallet with a name and id
router.post('/createWallet/', async function (req, res) {
  let wallet = await client.createWallet({
      walletId: req.body.walletId,
      ownerName: req.body.ownerName
  })
  res.status(200).send(wallet)
})

// returns all the wallets for the organization
router.get('/listWallets/', async function (req, res) {
  const wallets = await client.listWallets()
  res.status(200).send(wallets)
})

// deletes a wallet by the ID
router.post('/deleteWallet/', async function (req, res) {
  const walletId = req.body.walletId
  const response = await client.deleteWalletByQuery(walletId)
  console.log(response)
  res.sendStatus(200)
})

// returns all the credentials for a given wallet
router.get('/listCredentials/:walletId/', async function (req, res) {
  const credentials = await client.listCredentials(req.params.walletId)
  res.status(200).send(credentials)
})

// returns all the verifications for a given wallet
router.get('/listVerifications/:walletId/', async function (req, res) {
  const verifications = await client.listVerifications(req.params.walletId)
  res.status(200).send(verifications)
})

// returns a single credential in a given wallet
router.get('/getCredential/:walletId/:credentialId/', async function (req, res) {
  const credential = await client.getCredential(req.params.walletId, req.params.credentialId)
  console.log(credential)
  res.status(200).send(credential)
})

// resolves the connection invite link to accept a connection 
router.post('/acceptConnection/', async function (req, res) {
  const inviteUrl = req.body.inviteUrl
  const walletId = req.body.walletId
  try {
    request(inviteUrl, (err, response, body) => {
      if(response) {
        console.log(response)
        const urlParams = url.parse(response.request.href, true).query
        const urlData = urlParams.d_m
        console.log(urlData)
        client.acceptInvitation(walletId, urlData)
          .then(con => console.log(con))
          .then(connection => res.status(200).send(connection))
      } else {
        console.log('error')
        res.sendStatus(400)
      }
    })
  } catch(err) {
    console.log(err)
  }
  
})

// accepts a new  credential
router.post('/acceptCredential/:walletId/:credentialId/', async function (req, res) {
  const response = await client.acceptCredentialOffer(req.params.walletId, req.params.credentialId)
  res.status(200).send(response)
})

// returns current connections
router.get('/listConnections/:walletId/', async function (req, res) {
  const connections = await client.listConnections(req.params.walletId)
  res.status(200).send(connections)
})

// returns possible credentials for a verification
router.get('/listAvailableCredentials/:walletId/:verificationId/', async function (req, res) {
  const availableCredentials = await client.getAvailableCredentialsForVerification(req.params.walletId, req.params.verificationId)
  res.status(200).send(availableCredentials)
})

// completes a verification request by auto selecting a credential that meets the requirements
router.post('/submitVerification/:walletId/:verificationId', async function (req, res) {
  const response = await client.submitVerificationAutoSelect(req.params.walletId, req.params.verificationId)
  res.status(200).send(response)
})

module.exports = router
