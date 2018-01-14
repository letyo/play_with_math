/* xxxxxxxxxxxxxxxxxxxxxxxxxx the drag'n'drop game xxxxxxxxxxxxxxxxxxxxxxxxxx */

// the image, that we wanna drag'n'drop
var $draggable = $(".draggable");
// the palce (from)where we wanna drag'n'drop
var $dropdown_place = $(".dropdown_place");
// the varibale to check if the element is a child element of a dropdown_place
var child = false;
// the classname of the dragged element
var draggedClassName = "";
// the number of the drags
var dragsNumber = 0;
// number of the right answers
var trueAnswers = 0;
// the minimum number of the drags to accomplish the exercises
var exercisesQuantity = $(".results").length;
// the box where we drop or from we get the draggable item
var dragbox = "";
// is the element draggable
var isDraggable = false;
// win-text
var winText = "<p id='won'>Congratulation! You've made it!</p>";
// loose-text
var looseText = "<p id='lost'>Your time is over! You'll make it next time!</p>";

// it allows us to drag the image
function dragStart(event) {
    // get the id of the draggable image and save it as a text
    event.originalEvent.dataTransfer.setData("text", event.target.id);
    // modifies the opacity of the draggable object
    $(event.target).css("opacity", 0.5);

    // save the classname of the dragged element to the draggedClassName variable
    draggedClassName = $(event.target).prop("class");

    // get the id of the target to check if the drop target is the same as the drag from
    dragbox = $(event.target).parents(".dropdown_place").prop("id");

    // check if the element draggable
    if ($(event.target).prop("draggable") === true) {
        isDraggable = true;
    } else {
        end();
    }
}

// after drag'n'drop is over 
function dragEnd(event) {
    // modifies the opacity of the draggable object
    $(event.target).css("opacity", 1);
    
    $(".dropdown_place").each(function() {
        // check whether the dropdown places has a child, if not then remove the true/false classes
        if ($(this).children(".draggable").length === 0) {
            if ($(this).hasClass("true") === true) {
                $(this).removeClass("true");
            }
            if ($(this).hasClass("false") === true) {
                $(this).removeClass("false");
            }
        }
        // check how many children the dropdown place has, if it has 1, then change the class to true or false
        if ($(this).children(".draggable").length === 1 && $(this).hasClass("results")) {
            exercise_number = $(this).children(".draggable").prop("id");
            result_number = $(this).data("number_of_exercise");
            if (exercise_number == result_number) {
                $(this).removeClass("false");
                $(this).addClass("true");
                $(this).children(".draggable").attr("draggable", false);
                $(this).children(".draggable").off("dragstart");
            } else {
                $(this).removeClass("true");
                $(this).addClass("false");
            }
        }
    })
    
    // the true answers is the number of the class true
    trueAnswers = $(".true").length;

    // if the event.target parent doesn't have the same id at dragStart as at dragEnd
    if (dragbox !== $(event.target).parents(".dropdown_place").prop("id") && dragbox.length !== 0) {
        // if not all of the true answers are found give one to the dragsNumber and write it out
        if (trueAnswers < $dropdown_place.length && trueAnswers !== $dropdown_place.length - 1) {
            dragsNumber++;
            console.log(dragsNumber);
            // write out the number of the drags
            $("#dragsnumber p").html("Number of steps: " + dragsNumber);
        } 
        // if all of the true answers are found, then write it out the dragsNumber and "you won"
        if (trueAnswers === $dropdown_place.length - 1) {
            console.log(winText);
            // write out the win-text
            $("#win_or_loose_text").html(winText);

            // change the background color of the body
            $("html, body").css("background-color", "#99FF99");
                
            console.log("Drags number = " + (dragsNumber + 1));
            // write out the number of the drags
            $("#dragsnumber p").html("Number of steps: " + (dragsNumber + 1));

            clearInterval(countDown);
            console.log("Your remaining time: " + remainingTimeFormated);
        }
    }

    child = false;
    draggedClassName = "";
    dragbox = "";
    isDraggable = false;
    // remove all of the dropdown_target classes
    $dropdown_place.removeClass("dropdown_target");

}

// if enter the cursor with a draggable object to the dropdown_target/dropdown_place, then give them a class (if it doesn't have)
function add_class(event) {
    // it the dragged element has the class draggable (in this way we can not drop there all of the existing elements from everywhere)
    if (draggedClassName === "draggable") {
        // if the target doesn't have the class dropdown_target but the dropdown_place then give it the dropdown_target too
        if ($(event.target).hasClass("dropdown_target") === false
            // if I don't want to change the exercises list on dragEnter
            // && !$(event.target).hasClass("exercises")
            // && !$(event.target).parents().hasClass("exercises")
            ) {
            if ($(event.target).hasClass("dropdown_place") === true) {
                $(event.target).addClass("dropdown_target");
            }
        }
        // if the target parent has the class dropdown_place then change the child variable to true else change it to false (reason: if the child is true, then it is inside a dropdown_place element, and then the remove_class function won't trigger)
        if ($(event.target).parents().hasClass("dropdown_place") === true) {
            child = true;
        } else {
            child = false;
        }
    }
}

// if leave the cursor with a draggable object from the dropdown_target/dropdown_place, then remove the dropdown_target class (if it has)
function remove_class(event) {
    if ($(event.target).hasClass("dropdown_target") === true && child === false) {
        $(event.target).removeClass("dropdown_target");
    }
}

// it allows us to drop there
function allowDrop(event) {
    // it the dragged element has the class draggable (in this way we can not drop there all of the existing elements from everywhere)
    if (draggedClassName === "draggable") {
        // if it doesn't have a child with draggable class, if its parent doesn't have a child with draggable class, or it has the class exercises or its parent has the class exercises
        if (($(event.target).children(".draggable").length === 0 
            && $(event.target).parents(".dropdown_place").children(".draggable").length === 0) 
            || $(event.target).hasClass("exercises") === true
            || $(event.target).parents(".dropdown_place").hasClass("exercises") === true) {
            event.preventDefault();
        }
    }
}

// it drops the image there
function drop(event) {
    // if the dragged element is draggable
    if (isDraggable === true) {
        event.preventDefault();

        // remove all of the dropdown_target classes
        $dropdown_place.removeClass("dropdown_target");

        // get the saved id of the draggable/dragged object
        var data = event.originalEvent.dataTransfer.getData("text");

        // save the id of the dragged object
        exercise_number = data;
        // save the data-number_of_exercise of the dropdown target
        result_number = $(event.target).data("number_of_exercise");
        // save the data-number_of_exercise of the parent of the dropdown target
        result_number_parent = $(event.target).parents(".dropdown_place").data("number_of_exercise");

        if ($(event.target).hasClass("dropdown_place") === true) {
            // if the target is a dropdown_place then give the element them as last element
            $(event.target).append($("#" + data));

            // if the two number are the same, then give the dropdown place the class true else give its the class false but only then if the class of its is not exercises
            if ($(event.target).hasClass("exercises") === false) {
                if (exercise_number == result_number && $(event.target).hasClass("results") === true) {
                    $(event.target).addClass("true");
                } else {
                    $(event.target).addClass("false");
                }
            }
        } else if ($(event.target).parents(".dropdown_place").hasClass("exercises") === true) {
            // if the target is a draggable element inside the class exercises, then give the element after that child element 
            $(event.target).before($("#" + data));
        } else {
            // // if the target is not a dropdown_place but a child of them, then give the element as the parent last element
            $(event.target).parents(".dropdown_place").append($("#" + data));

            // if the two number are the same, then give the parent of the target the class true else give its the class false but only then if the class of the parent of its is not exercises
            if ($(event.target).parents(".dropdown_place").hasClass("exercises") === false) {
                if (exercise_number == result_number_parent && $(event.target).parents(".dropdown_place").hasClass("results") === true) {
                    $(event.target).parents(".dropdown_place").addClass("true");
                } else {
                    $(event.target).parents(".dropdown_place").addClass("false");
                }
            }
        }
    }

    child = false;
    draggedClassName = "";
    isDraggable = false;
    // remove all of the dropdown_target classes
    $dropdown_place.removeClass("dropdown_target");
}

// add the eventlistener to the draggable elements
$draggable.each(function() {
    $(this).on("dragstart", function(event) {
        dragStart(event);
    })
    $(this).on("dragend", function(event) {
        dragEnd(event);
    })
})

// add the eventlistener to the dropdown_places
$dropdown_place.each(function() {
    $(this).on("dragenter", function(event) {
        add_class(event);
    })
    $(this).on("dragleave", function(event) {
        remove_class(event);
    })
    $(this).on("drop", function(event) {
        drop(event);
    })
    $(this).on("dragover", function(event) {
        allowDrop(event);
    })
})

// write out the number of the exercises
$("#number_of_exercises p").html("The number of the exercises: " + exercisesQuantity);


/* xxxxxxxxxxxxxxxxxxxxxxxxxx the countdown xxxxxxxxxxxxxxxxxxxxxxxxxx */

// if custom input is chosen then get the time/exercise
var custom_exercisesTime = $("input[name='time_per_exercise']").data("time_per_exercise");
// the seconds to the end to the countdown (the time for the exercises is 10 sec / exersise)
var secondsToEnd = exercisesQuantity * 5;
if (custom_exercisesTime != 0) {
    secondsToEnd = exercisesQuantity * custom_exercisesTime;
}
// the remaining time (the seconds to the end to the countdown at its maximum)
var remainingTime = secondsToEnd;
// the formated remaining time
var remainingTimeFormated;
// the passed time from the beginning of the countdown in seconds
var passedTime;
// the formated passed time
var passedTimeFormated;

// the remaining time
var days;
var hours;
var minutes;
var seconds;

var countDown = setInterval(function () {

    // the exact date and time now
    var todaysDate = new Date().getTime();
        
    // the end date/time
    var countDownDate = todaysDate + remainingTime * 1000;
    
    // the distance between the two dates/times
    var distance = countDownDate - todaysDate;

    // the distance (remaining time) between the two dates/times (in days, hours, minutes and seconds)
    remainingDays = Math.floor(distance / (1000 * 60 * 60 * 24));
    remainingHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    remainingSeconds = Math.floor((distance % (1000 * 60)) / 1000);

    // the passed remainingSeconds after beginning 
    passedTime = secondsToEnd - remainingTime;

    // the passed time after the beginning of the countdown (in days, hours, minutes and seconds)
    passedDays = Math.floor(passedTime / (60 * 60 * 24));
    passedHours = Math.floor((passedTime % (60 * 60 * 24)) / (60 * 60));
    passedMinutes = Math.floor((passedTime % (60 * 60)) / (60));
    passedSeconds = Math.floor(passedTime % (60));

    if (distance < 0) {
        // if it is expired, then stop and write out "expired"
        clearInterval(countDown);
        console.log(looseText);
        // write out the loose-text
        $("#win_or_loose_text").html(looseText);

        // change the background color of the body
        $("html, body").css("background-color", "#FFE4E1");

        // do not allow to drag and drop any elements
        $draggable.css("pointer-events", "none");


    } else {
        // else get the remaining and passed time
        
        // format the remaining time
        // if I wanna get it with all of the time components
        // remainingTimeFormated = remainingDays + "d " + remainingHours + "h " + remainingMinutes + "min " + remainingSeconds + "s";
        // it I don't wanna get the 0 components of the time
        if (remainingDays !== 0) {
            remainingTimeFormated = remainingDays + "d " + remainingHours + "h " + remainingMinutes + "min " + remainingSeconds + "s";
        } else if (remainingHours !== 0) {
            remainingTimeFormated = remainingHours + "h " + remainingMinutes + "min " + remainingSeconds + "s";
        } else if (remainingMinutes !== 0) {
            remainingTimeFormated = remainingMinutes + "min " + remainingSeconds + "s";
        } else {
            remainingTimeFormated = remainingSeconds + "s";
        }

        // write out the remaining time in second
        console.log("Remaining time: " + remainingTime);
        // write out the remaining time (formated)
        console.log(remainingTimeFormated);

        // format the passed time
        // if I wanna get it with all of the time components
        // passedTimeFormated = passedDays + "d " + passedHours + "h " + passedMinutes + "min " + passedSeconds + "s";
        // it I don't wanna get the 0 components of the time
        if (passedDays !== 0) {
            passedTimeFormated = passedDays + "d " + passedHours + "h " + passedMinutes + "min " + passedSeconds + "s";
        } else if (passedHours !== 0) {
            passedTimeFormated = passedHours + "h " + passedMinutes + "min " + passedSeconds + "s";
        } else if (passedMinutes !== 0) {
            passedTimeFormated = passedMinutes + "min " + passedSeconds + "s";
        } else {
            passedTimeFormated = passedSeconds + "s";
        }

        // write out the passed time in second
        console.log("Passed time: " + passedTime);
        // write out the passed time (formated)
        console.log(passedTimeFormated);

        // write out the remaining time
        $("#remaining_time p").html("Remaining time: " + remainingTime + " sec");
        // write out the passed time
        $("#passed_time p").html("Passed time: " + passedTime + " sec");

        // reduce the remaining time with 1 sec
        remainingTime = remainingTime - 1;
    }

}, 1000)

// write out the starting time frame
$("#starting_time p").html("Starting time frame: " + secondsToEnd + " sec");


/* xxxxxxxxxxxxxxxxxxxxxxxxxx the positioning of the div results xxxxxxxxxxxxxxxxxxxxxxxxxx */

// get the distance between the last text of the menu and the top of the document and change it
function topMarginGame() {
    if ($("select[name='difficulty']").data("difficulty") !== "") {
        var topMarginGame = $("#win_or_loose_text").offset();
        // modify the top margin of the game
        $("#exercises").css("top", topMarginGame.top + 50);
        $("#results").css("top", topMarginGame.top + 50);
    }
}

$(window).bind("resize", function() {
    // the window's width without the scrollbars
    var windowWidth = $(window).innerWidth();

    // if (resultsMainDivWidth > 3 * resultsDivWidth + 20) {
    if (windowWidth > 588) {
        $(".results").css("left", "0px");
        $(".results:nth-of-type(6n+4)").css("left", "20px");
        $(".results:nth-of-type(6n+5)").css("left", "20px");
        $(".results:nth-of-type(6n+6)").css("left", "20px");
    // } else if (resultsMainDivWidth > 2 * resultsDivWidth + 20) {
    } else if (windowWidth > 442) {
        $(".results").css("left", "0px");
        $(".results:nth-of-type(4n+3)").css("left", "20px");
        $(".results:nth-of-type(4n+4)").css("left", "20px");
    // } else if (resultsMainDivWidth > resultsDivWidth + 20) {
    } else if (windowWidth > 320) {
        $(".results").css("left", "0px");
        $(".results:nth-of-type(2n)").css("left", "20px");
    } else {
        $(".results").css("left", "0px");
    }

    // change the distance between the last text of the menu and the top of the document
    topMarginGame()
})


/* xxxxxxxxxxxxxxxxxxxxxxxxxx formating the input fields xxxxxxxxxxxxxxxxxxxxxxxxxx */

// get the difficulty selector
var $select = $("select[name='difficulty']");
// get the custom input fields
var $input_custom = $(".input_custom");
// get the custom checkboxes
var $checkbox_custom = $(".checkbox_custom");
// get the submit button
var $submit = $("input[type='submit']");

// if select is changed
$select.change(function() {
    if ($("select[name='difficulty']").val() === "custom") {    
        // if custom is selected then show the custom input fields
        $("#custom_difficulty").css("display", "block");

        // change the distance between the last text of the menu and the top of the document
        topMarginGame()
    } else {
        // if other is selected then hide the custom fields
        $("#custom_difficulty").css("display", "none");

        // change the distance between the last text of the menu and the top of the document
        topMarginGame()
    }
})

$submit.click(function() {
    // if the selected item is not the custom, remove the values from the custom input fields
    if ($("select[name='difficulty']").val() !== "custom") {
        $input_custom.val("");
    }
})

// if one of the input custom field is focused, then make the text of it to bold
$input_custom.focus(function() {
    $(this).closest(".container_input_custom").children(".input_custom_text").css("font-weight", "bold");
})

// if one of the input custom field is blured, then make the text of it to normal
$input_custom.blur(function() {
    $(this).closest(".container_input_custom").children(".input_custom_text").css("font-weight", "normal");
})

$checkbox_custom.change(function() {
    if ($(this).is(":checked")) {
        // if one of the checkbox custom field is focused, then make the text of it to bold
        $(this).closest(".container_checkbox_custom").children(".checkbox_custom_text").css("font-weight", "bold");
    } else {
        // if one of the checkbox custom field is blured, then make the text of it to normal
        $(this).closest(".container_checkbox_custom").children(".checkbox_custom_text").css("font-weight", "normal");
    }
})


/* xxxxxxxxxxxxxxxxxxxxxxxxxx the modal xxxxxxxxxxxxxxxxxxxxxxxxxx */

// get the whole modal
var modal = $("#modal");
// get the info button
var infoButton = $("#infoButton");
// get the close button
var closeButton = $("#close");

// open the modal
infoButton.click(function() {
    // reset the design of the modal
    $("#info").css("display", "block");
    $("#errors").css("display", "none");
    modal.css("background-color", "rgba(0, 0, 0, 0.6)");
    // open the modal
    modal.css("display", "flex");
})

// close the modal with the close button
closeButton.click(function() {
    modal.css("display", "none");
})

// close the modal with click on outsideof the modal
$(window).click(function(event) {
    if (!$(event.target).closest(".modal_content").length && !$(event.target).is(infoButton) && !$(event.target).is($submit)) {
        modal.css("display", "none");
    } 
})

//when the user push the esc button, the modal closes
$(window).keydown(function(event) {
    if (event.keyCode === 27 || event.which === 27) {
        modal.css("display", "none");
    }
})



/* xxxxxxxxxxxxxxxxxxxxxxxxxx custom input fields validation xxxxxxxxxxxxxxxxxxxxxxxxxx */

// the array of errors
var field_errors = [];
// the error string
var field_error = false;
// the error texts
var multiple_errors  = [];
var input_empty = "<p>You have to fill out all of the input fields!</p>";
var checkbox_empty = "<p>You have to check at least one checkbox!</p>";
var input_false = "<p>It is only allowed to write numbers in the input fields, and minus sign only in min. number's and max. number's field!</p>";
var min_exercises = "<p>You have chosen too many exercise for the interval between min. and max. number. Please change that interval or the number of exercises! (Please be careful that the max number has to be always bigger than the min number.)</p>";
var min_max = "<p>The max. number have to be bigger than the min. number!</p>";

// only numbers can be written in in an input field
function ForceNumericOnly(input) {
    return input.each(function() {
        $(input).keydown(function(event) {
            var key = event.which || event.keyCode;
                if (!event.shiftKey && !event.altKey && !event.ctrlKey && 
                    // numbers   
                    key >= 48 && key <= 57 ||
                    // Numeric keypad
                    key >= 96 && key <= 105 ||
                    // comma, period, "." and minus on keypad
                    // key == 190 || key == 188 || key == 110 || 
                    key == 109 ||
                    // Backspace and Tab and Enter
                    key == 8 || key == 9 || key == 13 ||
                    // Home and End
                    key == 35 || key == 36 ||
                    // left, up, right and down arrows
                    key == 37 || key == 38 || key == 39 || key == 40 ||
                    // Del and Ins
                    key == 46 || key == 45)
                    return true;
                return false;
        });
    });
};
// it can be written in only numbers in the input field with the class input_number
ForceNumericOnly($input_custom);

// check whether a field has only numbers
function validateInputNumber(input) {
    if (input.prop("name") === "min_number" || input.prop("name") === "max_number") {
        var numbReg = /^\-?\d+$/;
        return numbReg.test(input.val());
    } else {
        var numbReg = /^\d+$/;
        return numbReg.test(input.val());
    }
}

// don't allow to click on submit button while the forms are not valid, or one is empty
$submit.click(function(event) {
    // reset the design of the modal
    $("#info").css("display", "block");
    $("#errors").css("display", "none");
    modal.css("background-color", "rgba(0, 0, 0, 0.6)");
    $("#errors").html("");
    // reset the design of the custom inputs
    $input_custom.each(function() {
        $(this).css("border", "2px inset white");
        $(this).closest(".container_input_custom").children(".input_custom_text").css("color", "black");
    })
    // reset the design of the custom checkboxes
    $(".container_checkbox_custom label").css("border", "1px solid white");
    $(".checkbox_custom_text").css("color", "black");

    // check whether the custom is selected
    if ($("select[name='difficulty']").val() === "custom") {

        // check the input fields (are they filled out and correctly)
        $input_custom.each(function() {
            if ($(this).val() === "") {
                field_errors.push($(this).prop("name"));
                field_errors.push("input_empty");
                // modify the custom inputs if it has error
                $(this).css("border", "1px solid red");
                $(this).closest(".container_input_custom").children(".input_custom_text").css("color", "red");
            }
        })

        // check the checkboxes (is at least one of them is checked)
        if ($checkbox_custom.not(":checked").length > $checkbox_custom.length - 1) {
            field_errors.push("checkbox");
            // modify the custom checkboxes if none of them is selected
            $(".container_checkbox_custom label").css("border", "1px solid red");
            $(".checkbox_custom_text").css("color", "red");
        }

        // check the proportion of the number of exercises and the interval between the min and max number
        if (field_errors.indexOf("number_of_exercises") === -1 && field_errors.indexOf("min_number") === -1 && field_errors.indexOf("max_number") === -1 && $checkbox_custom.not(":checked").length !== $checkbox_custom.length) {
            if ($("input[name='number_of_exercises']").val() > (Math.abs($("input[name='max_number']").val() - $("input[name='min_number']").val())) * ($checkbox_custom.length - $checkbox_custom.not(":checked").length) / 5) {
                field_errors.push("interval");
                // modify the number_of_exercises, min_number and max_number custom inputs
                $("input[name='number_of_exercises'], input[name='max_number'], input[name='min_number']").css("border", "1px solid red");
                $("input[name='number_of_exercises'], input[name='max_number'], input[name='min_number']").closest(".container_input_custom").children(".input_custom_text").css("color", "red");
            }
        }

        // check the proportion of the min and max number
        if (field_errors.indexOf("min_number") === -1 && field_errors.indexOf("max_number") === -1) {
            if (($("input[name='max_number']").val() - $("input[name='min_number']").val()) <= 0) {
                field_errors.push("min_max");
            }
        }

        // check whether the input fields have other values then number
        $input_custom.each(function() {
            if ($(this).val() !== "") {
                if (validateInputNumber($(this)) === false && $(this).val() !== "") {
                    field_errors.push("false");
                    // modify the custom inputs if it has error
                    $(this).css("border", "1px solid red");
                    $(this).closest(".container_input_custom").children(".input_custom_text").css("color", "red");
                }
            }
        })

        // if the array of errors is not empty
        if (field_errors.length > 0) {
            // then change the error string to true
            field_error = true;
        } else {
            // else to false
            field_error = false;
        }
        // if some/a field are/is empty prevent submit
        if (field_error === true) {
            event.preventDefault();

            // open the modal and write out the errors
            modal.css({"display": "flex", "background-color": "rgba(128, 0, 0, 0.6)"});
            $("#info").css("display", "none");
            $("#errors").css("display", "block");

            for (i = 0; i < field_errors.length; i++) {
                // check whether an error already written out
                if (multiple_errors.indexOf(field_errors[i]) === -1) {

                    // write out the errors
                    switch (field_errors[i]) {
                        case "input_empty":
                            $("#errors").append(input_empty);
                        break;
                        case "checkbox":
                            $("#errors").append(checkbox_empty);
                        break;
                        case "false":
                            $("#errors").append(input_false);
                        break;
                        case "interval":
                            $("#errors").append(min_exercises);
                        break;
                        case "min_max":
                            $("#errors").append(min_max);
                        break;
                        default:
                            console.log(field_errors[i]);
                        break;
                    }

                    multiple_errors.push(field_errors[i]);
                }
            }

            field_errors = [];
            multiple_errors = [];
        }
    }
})



/* xxxxxxxxxxxxxxxxxxxxxxxxxx after the document is loaded xxxxxxxxxxxxxxxxxxxxxxxxxx */

$(document).ready(function() {

    // positioninig the div results, after page is loaded
    // the window's width without the scrollbars
    var windowWidth = $(window).innerWidth();

    // if (resultsMainDivWidth > 3 * resultsDivWidth + 20) {
    if (windowWidth > 588) {
        $(".results").css("left", "0px");
        $(".results:nth-of-type(6n+4)").css("left", "20px");
        $(".results:nth-of-type(6n+5)").css("left", "20px");
        $(".results:nth-of-type(6n+6)").css("left", "20px");
    // } else if (resultsMainDivWidth > 2 * resultsDivWidth + 20) {
    } else if (windowWidth > 442) {
        $(".results").css("left", "0px");
        $(".results:nth-of-type(4n+3)").css("left", "20px");
        $(".results:nth-of-type(4n+4)").css("left", "20px");
    // } else if (resultsMainDivWidth > resultsDivWidth + 20) {
    } else if (windowWidth > 320) {
        $(".results").css("left", "0px");
        $(".results:nth-of-type(2n)").css("left", "20px");
    } else {
        $(".results").css("left", "0px");
    }


    // get the difficulty and modify the select menu
    var difficulty = $("select[name='difficulty']").data("difficulty");
    if (difficulty === "") {
        clearInterval(countDown);
    } else {
        $select.val(difficulty);
        // if custom is selected then show the custom input fields
        if ($("select[name='difficulty']").val() === "custom") {
            $("#custom_difficulty").css("display", "block");
        }
    }

    // change the distance between the last text of the menu and the top of the document
    topMarginGame()

    // check the checkboxes, if there are some checked, then make the text of it to bold
    $checkbox_custom.each(function() {
        if ($(this).is(":checked")) {
            // if one of the checkbox custom field is focused, then make the text of it to bold
            $(this).closest(".container_checkbox_custom").children(".checkbox_custom_text").css("font-weight", "bold");
        }
    })

})




// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// negatív számot is engedélyezni kell a min és a max number-nél