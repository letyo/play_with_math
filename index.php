<?php

    $number_of_exercises = 0;
    $min_number = 0;
    $max_number = 0;
    $operations_difficulty = 0;
    // all of the operations
    $mathematic_operations = array("addition", "subtraction", "multiplication", "division", "exponentiation", "root");   
    // the allowed numbers for the root-calculation
    $numbers_for_root = array(1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400);
    // the array of all exercises
    $exercises = array();
    // to check whether a value exists in the arrays
    $exists = true;
    
    // the values of the difficulties
    if (isset($_POST["submit"]) && isset($_POST["difficulty"]) && $_POST["difficulty"] != "") {
        $difficulty = $_POST["difficulty"];

        switch ($difficulty) {
            case 'veryeasy':
                $number_of_exercises = 3;
                $min_number = 0;
                $max_number = 10;
                $operations_difficulty = 1;
                break;
            case 'easy':
                $number_of_exercises = 5;
                $min_number = -10;
                $max_number = 10;
                $operations_difficulty = 1;
                break;
            case 'normal':
                $number_of_exercises = 5;
                $min_number = -10;
                $max_number = 10;
                $operations_difficulty = 3;
                break;
            case 'hard':
                $number_of_exercises = 10;
                $min_number = -100;
                $max_number = 100;
                $operations_difficulty = 3;
                break;
            case 'veryhard':
                $number_of_exercises = 10;
                $min_number = -100;
                $max_number = 100;
                $operations_difficulty = 5;
                break;
            case 'extreme':
                $number_of_exercises = 10;
                $min_number = -1000;
                $max_number = 1000;
                $operations_difficulty = 5;
                break;
            case 'custom':
                $number_of_exercises = $_POST["number_of_exercises"];
                $min_number = $_POST["min_number"];
                $max_number = $_POST["max_number"];

                $mathematic_operations = array();           

                // get the operations from the post method
                if (isset($_POST["addition"])) {
                    array_push($mathematic_operations, "addition");
                }
                if (isset($_POST["subtraction"])) {
                    array_push($mathematic_operations, "subtraction");
                }
                if (isset($_POST["multiplication"])) {
                    array_push($mathematic_operations, "multiplication");
                }
                if (isset($_POST["division"])) {
                    array_push($mathematic_operations, "division");
                }
                if (isset($_POST["exponentiation"])) {
                    array_push($mathematic_operations, "exponentiation");
                }
                if (isset($_POST["root"])) {
                    array_push($mathematic_operations, "root");
                }

                $operations_difficulty = count($mathematic_operations) - 1;


                break;
            default:
                break;
        }
    }

    for ($i = 0; $i < $number_of_exercises; $i++) {

        // the number of the current exercise
        $the_number_of_the_exercise = $i;

        // get the operation as random
        $operaton = rand(0, $operations_difficulty);
        $operaton = $mathematic_operations[$operaton];

        while ($exists == true) {
            // after the operation is given, make the new exercise and get the result, and save it in an array
            switch ($operaton) {
                case "addition":
                    // get the numbers for the exercise
                    $number1 = rand($min_number, $max_number);
                    $number2 = rand($min_number, $max_number);
                    // calculate the value of the exercise
                    $value = $number1 + $number2;
                    // if the value has decimals then write out two of them, if it doesn't have, then write out none
                    if (round($value, 0) != $value) {
                        $value = number_format($value, 2, ".", " ");
                    } else {
                        $value = number_format($value, 0, ".", " ");
                    }
                    // get the write-out of the exercise
                    $exercise = strval($number1) . " + " . strval($number2);
                    break;
                case "subtraction":
                    // get the numbers for the exercise
                    $number1 = rand($min_number, $max_number);
                    $number2 = rand($min_number, $max_number);
                    // calculate the value of the exercise
                    $value = $number1 - $number2;
                    // if the value has decimals then write out two of them, if it doesn't have, then write out none
                    if (round($value, 0) != $value) {
                        $value = number_format($value, 2, ".", " ");
                    } else {
                        $value = number_format($value, 0, ".", " ");
                    }
                    // get the write-out of the exercise
                    $exercise = strval($number1) . " - " . strval($number2);
                    break;
                case "multiplication":
                    // get the numbers for the exercise
                    $number1 = rand($min_number, $max_number);
                    $number2 = rand($min_number, $max_number);
                    // calculate the value of the exercise
                    $value = $number1 * $number2;
                    // if the value has decimals then write out two of them, if it doesn't have, then write out none
                    if (round($value, 0) != $value) {
                        $value = number_format($value, 2, ".", " ");
                    } else {
                        $value = number_format($value, 0, ".", " ");
                    }
                    // get the write-out of the exercise
                    $exercise = strval($number1) . " x " . strval($number2);
                    break;
                case "division":
                    // get the numbers for the exercise
                    $number1 = rand($min_number, $max_number);
                    $number2 = rand($min_number, $max_number);
                    // calculate the value of the exercise
                    if ($number2 != 0) {
                        $value = $number1 / $number2;
                    } else {
                        $value = 0;
                    }
                    // if the value (result) of the division has more then 2 decimals or the second number is 0, then get new numbers and value
                    while (round($value, 2) != $value || $number2 == 0) {
                        $number1 = rand($min_number, $max_number);
                        $number2 = rand($min_number, $max_number);
                        if ($number2 != 0) {
                            $value = $number1 / $number2;
                        }
                    }
                    // if the value has decimals then write out two of them, if it doesn't have, then write out none
                    if (round($value, 0) != $value) {
                        $value = number_format($value, 2, ".", " ");
                    } else {
                        $value = number_format($value, 0, ".", " ");
                    }
                    // get the write-out of the exercise
                    $exercise = strval($number1) . " / " . strval($number2);
                    break;
                case "exponentiation":
                    // get the numbers for the exercise
                    $number1 = rand($min_number, $max_number);
                    $number2 = 2;
                    // calculate the value of the exercise
                    $value = pow($number1, $number2);
                    // if the value has decimals then write out two of them, if it doesn't have, then write out none
                    if (round($value, 0) != $value) {
                        $value = number_format($value, 2, ".", " ");
                    } else {
                        $value = number_format($value, 0, ".", " ");
                    }
                    // get the write-out of the exercise
                    $exercise = strval($number1) . " ^ " . strval($number2);
                    break;
                case "root":
                    // get the number for the exercise
                    $number1 = $numbers_for_root[rand(0, count($numbers_for_root) - 1)];
                    // it can't be bigger than the $max_number
                    while ($number1 > $max_number) {
                        $number1 = $numbers_for_root[rand(0, count($numbers_for_root) - 1)];
                    }
                    // calculate the value of the exercise
                    $value = sqrt($number1);
                    // if the value has decimals then write out two of them, if it doesn't have, then write out none
                    if (round($value, 0) != $value) {
                        $value = number_format($value, 2, ".", " ");
                    } else {
                        $value = number_format($value, 0, ".", " ");
                    }
                    // get the write-out of the exercise
                    $exercise = "&radic;" . $number1;
                    break;
                default:
                    break;
            }

            $exists = false;
            // check if the value already exists in the arrays
            for ($n = 0; $n < $the_number_of_the_exercise; $n++) {
                if ($exercises[$n]["value"] == $value) {
                    $exists = true;
                }
            }
        }
    
        // make an associative array from the new variables
        $the_number_of_the_exercise = array("number_of_exercise" => $the_number_of_the_exercise, "exercise" => $exercise, "value" => $value);
        // save the associative array in an other array
        array_push($exercises, $the_number_of_the_exercise);

        $exists = true;
    }

?>

<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link type="text/css" rel="stylesheet" href="play_with_math.css"/>
    <script src="jQuery.js" defer></script>
    <script src="play_with_math.js" defer></script>
</head>
<body>

    <div id="options">
        <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>">
            <select name="difficulty" data-difficulty="<?php if (isset($_POST["difficulty"])) { echo $difficulty; } ?>">
                <option value="" disabled selected>Choose the difficulty</option>
                <option value="veryeasy">Very Easy</option>
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
                <option value="veryhard">Very Hard</option>
                <option value="extreme">Extreme</option>
                <option value="custom">Custom</option>
            </select>

            <input type="submit" name="submit" value="Let's Play!">

            <button type="button" id="infoButton">info</button>

            <!-- inputs for the custom option -->
            <div id="custom_difficulty">

                <div id="container_input_custom">

                    <p id="container_input_custom_text">Specifications of the exercises:</p>

                    <div class="container_input_custom">
                        <span class="input_custom_text">Number of exercises:</span>
                        <input class="input_custom" type="text" name="number_of_exercises" value="<?php if (isset($_POST['number_of_exercises'])) { echo $_POST['number_of_exercises']; } ?>" autocomplete="off">
                    </div>

                    <div class="container_input_custom">
                        <span class="input_custom_text">Min. number:</span>
                        <input class="input_custom" type="text" name="min_number" value="<?php if (isset($_POST['min_number'])) { echo $_POST['min_number']; } ?>" autocomplete="off">
                    </div>

                    <div class="container_input_custom">
                        <span class="input_custom_text">Max. number:</span>
                        <input class="input_custom" type="text" name="max_number" value="<?php if (isset($_POST['max_number'])) { echo $_POST['max_number']; } ?>" autocomplete="off">
                    </div>

                    <div class="container_input_custom">
                        <span class="input_custom_text">Time/exercise:</span>
                        <input class="input_custom" type="text" name="time_per_exercise" value="<?php if (isset($_POST['time_per_exercise'])) { echo $_POST['time_per_exercise']; } ?>" data-time_per_exercise="<?php if (isset($_POST['time_per_exercise'])) { echo $_POST['time_per_exercise']; } ?>" autocomplete="off">
                    </div>
                </div>

                <div id="container_checkbox_custom">

                    <p id="container_checkbox_custom_text">Oparations:</p>

                    <div class="container_checkbox_custom">
                        <input id="addition" class="checkbox_custom" type="checkbox" name="addition" <?php if (isset($_POST["addition"])) {echo "checked";} ?>>
                        <label for="addition"></label>
                        <span class="checkbox_custom_text">Addition</span>
                    </div>

                    <div class="container_checkbox_custom">
                        <input id="subtraction" class="checkbox_custom" type="checkbox" name="subtraction" <?php if (isset($_POST["subtraction"])) {echo "checked";} ?>>
                        <label for="subtraction"></label>
                        <span class="checkbox_custom_text">Subtraction</span>
                    </div>

                    <div class="container_checkbox_custom">
                        <input id="multiplication" class="checkbox_custom" type="checkbox" name="multiplication" <?php if (isset($_POST["multiplication"])) {echo "checked";} ?>>
                        <label for="multiplication"></label>
                        <span class="checkbox_custom_text">Multiplication</span>
                    </div>

                    <div class="container_checkbox_custom">
                        <input id="division" class="checkbox_custom" type="checkbox" name="division" <?php if (isset($_POST["division"])) {echo "checked";} ?>>
                        <label for="division"></label>
                        <span class="checkbox_custom_text">Division</span>
                    </div>

                    <div class="container_checkbox_custom">
                        <input id="exponentiation" class="checkbox_custom" type="checkbox" name="exponentiation" <?php if (isset($_POST["exponentiation"])) {echo "checked";} ?>>
                        <label for="exponentiation"></label>
                        <span class="checkbox_custom_text">Exponentiation</span>
                    </div>

                    <div class="container_checkbox_custom">
                        <input id="root" class="checkbox_custom" type="checkbox" name="root" <?php if (isset($_POST["root"])) {echo "checked";} ?>>
                        <label for="root"></label>
                        <span class="checkbox_custom_text">Square root</span>
                    </div>

                </div>

            </div>

            
        </form>
    </div>

<?php
    // only then write out something, if the submit was clicked
    if (isset($_POST["submit"]) && isset($_POST["difficulty"]) && $_POST["difficulty"] != "") {
?>
        <div id="datas">
            <div id="starting_time">
                <p>Starting time frame:</p>
            </div>
            <div id="remaining_time">
                <p>Remaining time:</p>
            </div>
            <div id="passed_time">
                <p>Passed time:</p>
            </div>
            <div id="number_of_exercises">
                <p>The number of the exercises (the min steps to accomplish the exercises):</p>
            </div>
            <div id="dragsnumber">
                <p>Number of steps:</p>
            </div>
            <div id="win_or_loose_text">
                <p>Try your best!</p>
            </div>
        </div>        


        <div id="exercises">
        <p>Exercises</p>
        <ul id="source" class="dropdown_place exercises" draggable="false">
<?php
            for ($i = 0; $i < $number_of_exercises; $i++) {
?>
                <li draggable="true" id="<?php echo $exercises[$i]["number_of_exercise"]; ?>" class="draggable">
                    <?php echo $exercises[$i]["exercise"]; ?>
                </li>
<?php
            }
?>
        </ul>
        </div>

        <div id="results">
        <p>Results</p>
<?php
        for ($i = 0; $i < $number_of_exercises; $i++) {
            $n = rand(0, $number_of_exercises - 1 - $i);
?>
            <div id="<?php echo 'result' . $i; ?>" class="dropdown_place results" data-number_of_exercise="<?php echo $exercises[$n]["number_of_exercise"]; ?>" draggable="false">
                <p class="result"><?php echo $exercises[$n]["value"]; ?></p>
            </div>
<?php
            // delete the written-out element
            array_splice($exercises, $n, 1);
        }
?>
        
<?php
    }

    $_POST = array();
?>

    <div id="modal">

        <div class="modal_content">
            
            <span id="close">&#10006;</span>

            <div id="errors">

            </div>

            <div id="info">
                <p>It's a very easy game:</p>
                <p>You can chose the difficulty of the game, then click on the "Let's play" button. (You can even chose custom difficulty level, where you can customize, how would you like to play. If you wanna play with minus numbers, then to write the minus sign you can only use the minus sign on the numpad.)</p>
                <p>There is a time frame/exeercise for each difficulty level.</p>
                <p>There are the exercises always on the right side. You should them calculate and drop them on the result fields (on the left side).</p>
                <p>If you did it right, then the field of the result become green, if you made a mistake, then it become red.</p>
                <p>You should all of the exercises drop on the fields of result. If you can make it on time, then you win, if you don't have any time, then you loose.</p>
                <p>Have fun!</p>
            </div>

        </div>
    </div>
    

</body>
</html>