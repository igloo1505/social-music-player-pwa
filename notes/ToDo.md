# To-Dos


## UFO stuff

- [x] Animate Entrance of UFO
- [x] Animate UFO approaching Earth
- [ ] Animate UFO from Earth to zoom away on even the smallest scroll
- [x] Fix UFO upClose animation so UFO doesn't overhand the canvas.

## General UI Stuff

- [ ] Fix Navbar shadow, especially that effecting clickable components.
- [ ] Fix grid card issue where they don't align appropriately on viewport change.
- [ ] Fix issue with Spline social buttons not going back to standard state if mouseLeave occurs during performance intensive period. Add global mouseMove listener with check to see if the html overlay element is currently hovered. Make sure to avoid any further calculations if canvas is hovered for performance reasons, and find a way to check if canvas has fully rendered before initializing global listener.

## Performance 

- [ ] Find way to use getServerSideProps and getInitialProps with audio and texture files, and use them in place of simple URL strings which then need to be requested _after_ initial render and canvas initialization.
- [ ] Handle 'multiple instances of Three.js' issue.
- [ ] Handle unable to serialize texture warning.
- [ ] Get audio files on server side as well, similarly to approach taken with textures and glb's.
- [ ] Add performance regression according to docs.
- [ ] Consider actually using ref's to update play and pause state

## Bugs

- [ ] Handle issue with position trnasition suddenly sending UFO back to 'hideDarkside' position, seemingly on scroll or input from user if occurs at performance demanding time.
- [ ] Add type declaration for .glb files.
- [ ] Handle issue with mute switch showing up before audio is actually initialized.


## Potential Production issues

- [ ] Questionable approach to grabbing models and textures on server side. If there's an issue with rendering models in production revert to using pure strings with standard loaders.
    - For now this seems to be much more performant... although there's still a lot to be desired!



# General To-Do

- [ ] Reply to Meaghan
- [ ] Reply to interview response email
- [ ] Set alarm for Interchange in the morning
- [ ] Build useful command line to-do app
    - [ ] Build command line alarm and timer
- [ ] Figure out format command for vim and how to view lint errors
