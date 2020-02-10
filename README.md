<p align="center">
  <a href="https://zenaton.com" target="_blank">
    <img src="https://user-images.githubusercontent.com/36400935/58254828-e5176880-7d6b-11e9-9094-3f46d91faeee.png" target="_blank" />
  </a><br>
  Build and run event-driven processes within the product journey in days instead of months.<br>
ie. payment, booking, personalized communication sequences, ETL processes and more.<br>
  <a href="https://docs.zenaton.com" target="_blank">
    <strong> Explore the docs » </strong>
  </a> <br>
  <a href="https://zenaton.com" target="_blank"> Website </a>
    ·
  <a href="https://github.com/zenaton-samples/" target="_blank"> Sample projects </a>
    ·
  <a href="https://github.com/zenaton/examples-node" target="_blank"> Examples </a>
    ·
  <a href="https://app.zenaton.com/tutorial/node/examples" target="_blank"> Tutorial </a>
</p>

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Refer a friend](#refer-a-friend)
  - [About this repository](#about-this-repository)
  - [How to run it](#how-to-run-it)
    - [Step-by-step tutorial](#step-by-step-tutorial)
    - [Requirements](#requirements)
    - [Zenaton Agent setup](#zenaton-agent-setup)
      - [Running the Agent on Heroku (Recommended)](#running-the-agent-on-heroku-recommended)
      - [Running the Agent locally](#running-the-agent-locally)
      - [Running the Agent in Docker](#running-the-agent-in-docker)
      - [Running the Agent somewhere else](#running-the-agent-somewhere-else)
    - [Running the workflow](#running-the-workflow)
    - [Sending external events](#sending-external-events)
  - [Going further](#going-further)
  - [Troubleshooting](#troubleshooting)
    - [Issues with the Zenaton Agent](#issues-with-the-zenaton-agent)
    - [Issues with this sample project](#issues-with-this-sample-project)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Refer a friend

## About this repository

This sample project demonstrates how to use Zenaton to build a referral system in your product.

This is a simple workflow that starts when a user invites 5 friends to purchase an "Awesome Cheesecake" Deal. If at least 3 friends also purchase the deal then the user is credited for their payment and gets it for free.

Our workflow will wait for up to 3 of the 5 friends to purchase the deal at which point it will refund the user their payment so that they receive the deal for free.

## How to run it

### Step-by-step tutorial

If you want a step-by-step tutorial on how to run this project and explaining what it does, you can
follow the tutorial on [this page](https://zenaton.com/workflows-examples/projects/tutorial-refer-friend).

If you're already comfortable running Zenaton projects, feel free to follow the instructions below instead.

### Requirements

To run this project, you need the following:

- A [Zenaton](https://zenaton.com/register) account, to get your [App ID and API Token](https://app.zenaton.com/api).
- (Optional) A [Sendgrid](https://sendgrid.com/) API key.

### Zenaton Agent setup

#### Running the Agent on Heroku (Recommended)

Running the Agent on Heroku is the quickier way to get started. Make sure you have an account on [Heroku](https://www.heroku.com/) before continuing.

Click the following button to deploy this project on Heroku. You will be prompted for your Zenaton credentials and a Sendgrid API key (optional).
Make sure to fill-in them correctly and click "Deploy".

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

If you go to the [Agents page](https://app.zenaton.com/agents) on your Dashboard, you should see one agent connected.

#### Running the Agent locally

Make sure you have NodeJS correctly installed on your system. If you don't, you can download
NodeJS [here](https://nodejs.org/en/download/).

Clone this repository:

```sh
git clone git@github.com:zenaton-samples/refer-a-friend.git
```

Go into the project directory and install dependencies:

```sh
npm install
```

Fill-in the `.env` file with all the required credentials. You can find your Zenaton App ID and API Token on [this page](https://app.zenaton.com/api).
You can also enter a Sendgrid API key if you want to receive the email notification.

Install the Zenaton Agent on your system:

```sh
curl https://install.zenaton.com/ | sh
```

And then run the agent:

```
zenaton listen --boot=boot.js
```

If you go to the [Agents page](https://app.zenaton.com/agents) on your Dashboard, you should see one agent connected.

#### Running the Agent in Docker

Make sure you have Docker and docker-compose correctly installed on your system.
If not, you can find the installation instructions for Docker [here](https://docs.docker.com/install/)

Create your `.env` file by running the following command:

```sh
cp -n .env.sample .env
```

Fill-in the `.env` file with all the required credentials. You can find your Zenaton App ID and API Token on [this page](https://app.zenaton.com/api).
You can also enter a Sendgrid API key if you want to receive the email notification.

Then, you can start the agent:

```sh
cd docker && docker-compose build && docker-compose up
```

If you go to the [Agents page](https://app.zenaton.com/agents) on your Dashboard, you should see one agent connected.

#### Running the Agent somewhere else

You can check [our documentation](https://docs.zenaton.com/going-to-production/) for more deployment options: AWS, Google Cloud, Clever Cloud, and more.

### Running the workflow

You're all set. It's time to start the workflow. We will use the `curl` command in a terminal to do that,
but you can start the workflow from your application, in any programming language as long as
you have access to an HTTP client.

Make sure to replace `<YOU API TOKEN>` and `<YOUR APP ID>` with the one you retrieved on the Zenaton website before using the following command.
Also, if you entered a Sendgrid API Key to receive the email notification, make sure to also replace the `foo@example.com` email
address by your own.

```sh
curl --request POST \
  --url https://gateway.zenaton.com/graphql \
  --header 'authorization: Bearer <YOUR API TOKEN>' \
  --header 'content-type: application/json' \
  --data '{"query":"mutation ($input: DispatchWorkflowInput!) {\n  dispatchWorkflow(input: $input) {\n    id\n  }\n}\n","variables":{"input":{"appId":"<YOUR APP ID>","environment":"dev","name":"ReferAFriend","input":"[{\"id\": 123,\"email\": \"foo@example.com\",\"deal\": \"awesome cheese cake\"}]","tag":"123","version":null}}}'
```

This starts the workflow and you should be able to see it on your [Dashboard](https://app.zenaton.com/workflows).

The workflow will start waiting for the `deal_purchased` external event. It needs to receive this event three times
to issue a refund to the user.

### Send events to the workflow

Let's send this event using a `curl` command again. You can also send events from your application
using an HTTP Client to send events through the Zenaton API.

Again, make sure to correctly replace the `<YOUR API TOKEN>` and `<YOUR APP ID>` placeholders in the following command, and then run it:

```sh
curl --request POST \
  --url https://gateway.zenaton.com/graphql \
  --header 'authorization: Bearer <YOUR API TOKEN>' \
  --header 'content-type: application/json' \
  --data '{"query":"mutation ($input: SendEventToWorkflowsInput!) {\n  sendEventToWorkflows(input: $input) {\n    status\n  }\n}\n","variables":{"input":{"appId":"<YOUR APP ID>","environment":"dev","name":"deal_purchased","data":"[{\"deal_name\": \"awesome cheese cake\",\"email\": \"friend_1@example.com\"}]","selector":{"name":"ReferAFriend","tag":"123"}}}}'
```

Check your Dashboard to see the event that has been received by the workflow. And you will see that the workflow has started
waiting again for a new `deal_purchased` event.

You can re-use the previous command to send two other events to the workflow. When they are received,
you should see the workflow running a `Refund` task which is going to issue a refund to the person who invited
their friends, and after you should also see the workflow run a `SendEmail` task which is going
to send an email notification to the person to inform them about the refund if you have provided a Sendgrid API key
and a correct email address when running the workflow.

## Going further

There are a lot of things that could be added to this workflow:

For example, the current implementation does not check if the three events come from three different friends.
You could try to fix that by making sure the three events contain different email addresses.

If you want to see how to do that, you can take a look at our [step-by-step tutorial](https://zenaton.com/workflows-examples/projects/tutorial-refer-friend).

## Troubleshooting

### Questions? 

If you encounter any issues or problems click on the chat in the bottom right hand side of the screen on the Zenaton dashboard.

### Issues with the Zenaton Agent

If you have a question about the Agent installation or usage, you can take a look at the [dedicated documentation](https://docs.zenaton.com/agent/installation/).


### Issues with this project

If you have any issue with this sample project, feel free to open a new issue on the repository.
