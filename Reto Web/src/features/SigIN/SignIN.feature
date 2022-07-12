Feature: Open URL
I as User of the system wish to verify LogIN

@LogIN
Scenario: LogIN
Given I access the page and log in with my user name 'standard_user' and Password 'secret_sauce'
When I add a product to the shopping cart 'Sauce Labs Backpack'
And I enter my data to review the checkout, fill First Name 'Christian Roman' Last Name 'Roman Rojas' and my code Zip '051'
And I want to validate that the selected values are the same 'Sauce Labs Backpack'

@ValidacionLogIn
Scenario: Validate Login
Given I open the page and validate "standard_user" and Password ""
Given I open the page and validate "locked_out_user" and Password ",.,.,."
Given I open the page and validate "problem_user" and Password "12345"
Given I open the page and validate "performance_glitch_user" and Password "@#$%&$"
Given I open the page and validate "standard_user" and Password "@#$%&$"

            | Name                    | Password     |
            | locked_out_user         | secret_sauce |
            | problem_user            | 12345        |
            | performance_glitch_user | @#$%&$       |
            | standard_user           | @#$%&$       |