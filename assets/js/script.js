// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").click(function(event) {
    let itemId = $(this).parent().attr("id");
    let itemText = $(this).siblings(".description").val();
    if (itemText !== "") {
      localStorage.setItem(itemId, itemText);
    }
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function updateTimeClass() {
    // Get the current hour in 24-hour time
    let hour = dayjs().hour();
    // Store each time block element
    let timeBlockEl;
    // For each hour, set the correct class
    for (let i = 9; i < 18; i++) {
      // Get the time block element
      timeBlockEl = $("#hour-" + i);
      // For blocks before the current time, set to past
      if (i < hour) {
        if (timeBlockEl.hasClass("present")) {
          timeBlockEl.removeClass("present");
        }
        if (!timeBlockEl.hasClass("past")) {
          timeBlockEl.addClass("past");
        }
        // For the block matching current time, set to present
      } else if (i === hour) {
        if (timeBlockEl.hasClass("future")) {
          timeBlockEl.removeClass("future");
        }
        if (!timeBlockEl.hasClass("present")) {
          timeBlockEl.addClass("present");
        }
        // For the blocks after the current time, set to future
      } else {
        if (!timeBlockEl.hasClass("future")) {
          timeBlockEl.addClass("future");
        }
      }
    }
  }

  // Update the classes immediately, then repeatedly as time goes on
  updateTimeClass();
  setInterval(updateTimeClass, 10000);

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // Display the current date in the header of the page.
  const dateEl = $("#currentDay");
  dateEl.text(dayjs().format("MMMM DD, YYYY"));
  setInterval(function() {
    dateEl.text(dayjs().format("MMMM DD, YYYY"));
  }, 1000);
});
