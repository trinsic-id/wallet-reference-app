const express = require('express')
const router = express.Router()
const request = require('request')
const url = require('url')

const { WalletServiceClient, Credentials } = require('@trinsic/service-clients')
require('dotenv').config()

const client = new WalletServiceClient(
  new Credentials(process.env.ACCESS_TOKEN),
  { noRetryPolicy: true }
)

// Bug in creating wallets with the SDK. 
// The wallet name or ID do not get passed correctly

router.post('/createWallet/', async function (req, res) {
  let wallet = await client.createWallet({
    body: {
      ownerName: req.body.ownerName,
      walletId: req.body.walletId
    }
  })
  res.sendStatus(200)
})

router.get('/listWallets/', async function (req, res) {
  const wallets = await client.listWallets()
  res.status(200).send(wallets)
})

router.post('/deleteWallet/', async function (req, res) {
  const walletId = req.body.walletId
  const response = await client.deleteWalletByQuery(walletId)
  console.log(response)
  res.sendStatus(200)
})

router.get('/listCredentials/:walletId/', async function (req, res) {
  const credentials = await client.listCredentials(req.params.walletId)
  res.status(200).send(credentials)
})

router.get('/listVerifications/:walletId/', async function (req, res) {
  const verifications = await client.listVerifications(req.params.walletId)
  res.status(200).send(verifications)
})

router.get('/getCredential/:walletId/:credentialId/', async function (req, res) {
  const credential = await client.getCredential(req.params.walletId, req.params.credentialId)
  console.log(credential)
  res.status(200).send(credential)
})

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

router.post('/acceptCredential/:walletId/:credentialId/', async function (req, res) {
  const response = await client.acceptCredentialOffer(req.params.walletId, req.params.credentialId)
  res.status(200).send(response)
})

router.get('/listConnections/:walletId/', async function (req, res) {
  const connections = await client.listConnections(req.params.walletId)
  res.status(200).send(connections)
})

router.get('/listAvailableCredentials/:walletId/:verificationId/', async function (req, res) {
  const availableCredentials = await client.getAvailableCredentialsForVerification(req.params.walletId, req.params.verificationId)
  res.status(200).send(availableCredentials)
})

router.post('/submitVerification/:walletId/:verificationId', async function (req, res) {
  const response = await client.submitVerificationAutoSelect(req.params.walletId, req.params.verificationId)
  res.status(200).send(response)
})

module.exports = router
