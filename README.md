# Live Coding Exercise

During the exercise, we'll tackle some of these issues with the corresponding feature and see if we can resolve them. It's important to spend some time in each section, so, don't worry about getting to each ticket.

<hr>

## Visual issues

<!--### Slideshow needs to animate
At the very least, the slideshow should animate between positions.-->

### Items should "fade" off
Instead of simply being cut off by the black edge, the design calls for items to subtly fade off on the right side.

<!--### Links are sometimes hard to click on
Some of the shorter links are pain to click on - they seem too small. Can you take a look?-->

<hr>

## Logical issues

<!--### Carousel doesn't "stick" to items
When navigated, the carousel should always have a single item visible in the left slot - never cut off.-->

<!--### Carousel shouldn't move past the last item
When a user is viewing a carousel with 5 items, but only 4 are visible, when they advance, they should NOT see a single item and 3 blank slots - they should see the final four items.-->

<!--### Resizing the window, then navigating, breaks the carousel
Try to resize the window after you load, then play with the carousel to see the problem.-->

<hr>

## Enhancements

### Individual items should stand out when hovered
Right now the hover effect on individual items is very subtle, but we want something that really stands out and feels fun.

<!--### Items should animate individually
The designer wanted something where, when the slides move on/off screen, they don't all move at once - instead, they should be slightly out of sync, like a toy train being pulled.-->

### User should not be able to advance slideshow while it's animating
Once you have the slideshow animating, we need to make sure that clicking the arrow DURING animation doesn't cause an event pileup. Prevent clicks during this time.
