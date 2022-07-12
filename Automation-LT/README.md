# First time run

As root or admin.
### Run tests by tag @run

To install dependencies:
```console
$ npm install
```

To execute web testing in Chrome

```console
To start validation for All flow --> "npm run testLean"
To start validation for Login --> "npm run testLogin"



### Generate Allure-Reports after an execution

```console
$ npm run testLean --reporter mochawesome 
$ npm run testLogin --reporter mochawesome
```

# The programming language and testing frameworks used.
 

  The programing language is Javascript and testing Frameworks used is codeceptjs 
  
## The design pattern 

The design pattern used is Page Object Model



# BrowserStack service configuration

If you don't have an account but you want to try this service, firstly you need to create an **ACCESS_KEY**, that is **BROWSERSTACK_USERNAME** and **BROWSERSTACK_ACCESS_KEY**.

To create an account please go to [the official website](https://www.browserstack.com) to sign up.

When you are logged in, go to profile and click on *"Go to Dashboard"* to get username and access key.

This credentials have to be in config file, for example in: config\wdio.mobile.bs.conf.ts y fields: user and key entry respectively, we need to define the enviroment variables.

We need to create a local .env file with something like that:

BROWSERSTACK_USERNAME=OUR_BROWSERSTACK_USERNAME
BROWSERSTACK_ACCESS_KEY=OUR_BROWSERSTACK_ACCESS_KEY


# Github 

  The link of the GitHub's repository is in the link : 
https://github.com/Crojasf01/Lean-Tech

## Commits:


For our commits message we use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification which provides an easy set of rules for creating an explicit commit history adding readable meaning to commit messages.

  
> See [Conventional Commits full specification](https://www.conventionalcommits.org/en/v1.0.0/#specification).

  

#  Process

1. Fork from `master`/`main` branch.

2. Create your branch with the reference of the associated ticket id of your project management tool like Jira, Azure DevOps  (`git checkout -b type/####-Description`)

3. Commit your changes (`git commit -am 'feat(feature):'`)

4. Push to the branch (`git push origin type/####-description`)

5. Create new Pull Request