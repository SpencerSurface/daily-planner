// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Listener for click events on the save button
  $(".saveBtn").click(function(event) {
    // Get the id of the time block containing the targetted save button
    let itemId = $(this).parent().attr("id");
    // Get the content of the textarea sibling of the targetted save button
    let itemText = $(this).siblings(".description").val();
    // If there's content, save it, using itemId as the key
    if (itemText !== "") {
      localStorage.setItem(itemId, itemText);
      // If there's no content, remove saved content if it exists
    } else {
      localStorage.removeItem(itemId);
    }
  });

  // Update the classes immediately, then repeatedly as time goes on
  updateTimeClass();
  setInterval(updateTimeClass, 10000);

  // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  let textContent;
  // For each time block element
  for (let i = 9; i < 18; i++) {
    // Get the content for that element from storage
    textContent = localStorage.getItem("hour-" + i);
    // If there was content stored, retrieve and display it
    if (textContent) {
      $("#hour-" + i + " .description").text(textContent);
    }
  }

  // Render the date immediately, then repeatedly as time goes on
  renderDate();
  setInterval(renderDate, 10000);
});



// Function definitions:

// Apply the past, present, or future class to each time block by comparing the id to the current hour
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
      timeBlockEl.addClass("past");
      timeBlockEl.removeClass("present");
      timeBlockEl.removeClass("future");
      // For the block matching current time, set to present
    } else if (i === hour) {
      timeBlockEl.removeClass("past");
      timeBlockEl.addClass("present");
      timeBlockEl.removeClass("future");
      // For the blocks after the current time, set to future
    } else {
      timeBlockEl.removeClass("past");
      timeBlockEl.removeClass("present");
      timeBlockEl.addClass("future");
    }
  }
}

// Display the current date in the header of the page
function renderDate() {
  $("#currentDay").text(dayjs().format("dddd, MMMM DD[th]"));
}