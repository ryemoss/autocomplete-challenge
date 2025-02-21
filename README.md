# Autocomplete Demo

This is a UI/UX-focused challenge to test how you approach building a new frontend feature.

## Instructions

1. Fork the repository
2. Make sure you can run the app locally
3. Do your best on the challenge (see below)
4. Deploy the app somewhere (we recommend Vercel)
5. Send a link to [milo@synonym.bio](milo@synonym.bio) once you're ready for us to review it!

Ideally, you should try to spend no more than 2-3 hours on this challenge. If it's taking way longer than that, or you run into deployment or environment issues, let me know.

## Challenge

This React app has a simple **equation editor**, which is similar to something we've had to build at Synonym. We want to make it easy and intuitive for non-software engineers to write simple equations. The equation syntax is a bit of a hybrid between a programming language and spreadsheet formulas.

### Equations

An *equation* is a simple mathematical equation of the form `lhs = rhs`. There is a left-hand and right-hand side, separated by an equals sign.
- The left-hand side should have one *identifier* (e.g `x` or `my_variable` or `SomeIdentifier`)
- The right hand side can contain expressions with multiple **identifiers** and arithmetic operations (e.g `1 + Hello * World` or `Foo / Bar`).

### Identifiers

Identifiers are a general term for variables, functions, constants, etc. For example, the equation `x = sqrt(variable_1) + Variable2.property` has four identifiers: `x`, `sqrt`, `variable_1`, and `Variable2.property`. Valid identifiers follow the Regex `^[a-zA-Z_][a-zA-Z0-9_\.]*`.

### Your challenge: adding autocomplete

As the user types an equation, we want to suggest identifiers that match the text they've typed so far.

**Your challenge is to add an autocomplete feature to the equation editor.** Just like a software IDE, the autocomplete should suggest completions as the user types.

**Here are the main requirements:**
- It should open up when the user starts typing
- It should follow the location of the user's cursor
- If the user adds an equation (e.g `MyVariable = 1 + 2`), then the LHS of the equation (`MyVariable`) should be added to the autocomplete options; the user has just defined a new identifier.
- The `Tab` key should select the top suggestion and insert it into the equation at the current cursor location
- The panel on the right has the initial list of identifiers that should be autocompleted. Feel free to add more or change them for testing purposes.

**Things you should not worry about:**
- Parsing/evaluating the equations
- Enforcing proper syntax in equations

**Other than these requirements, you're free to make any decisions about the UI/UX of the autocomplete.**

## Scoring / Feedback

We don't expect the feature to be perfect, and are looking for the following things (ordered by importance):
1. Does the autocomplete work? Is it easy/intuitive to use?
2. Does the UI look nice? Is it something we'd be proud to demo to a user?
3. Is the code easy to understand and improve on in the future?

## Quick Start

- Install dependencies with `yarn install`.
- Run the development server with `yarn dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Optional Improvements

If you're feeling particularly ambitious, you're welcome to improve aspects of the app besides the autocomplete. To give you some ideas:

- Make the equation panel scroll vertically if the user has many equations
- Add the ability to delete single equations or clear all of them
- Make the app responsive for smaller screens!
- Highlight identifiers based on their semantic type (e.g functions, variables, constants)
- Use a better color scheme or add dark mode
- Organize, refactor, and otherwise improve the code

## Questions

If you have questions, don't hesitate to reach out to me at [milo@synonym.bio](milo@synonym.bio).