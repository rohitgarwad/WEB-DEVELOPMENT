#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guessing_game --tuples-only -c"

GENERATE_RANDOM_NUMBER() {
  # Generate a random number between 1 and 1000
  RANDOM_NUMBER=$((RANDOM % 1000 + 1))
}

GUESS_COUNT=0

GUESS_NUMBER() {
  echo $1
  read NUMBER
  # increment number of tries
  ((GUESS_COUNT++))
  # check if valid number
  if [[ ! $NUMBER =~ ^[0-9]+$ ]]
  then
    GUESS_NUMBER "That is not an integer, guess again:"
  # check if number is lower
  elif [[ $NUMBER -lt $RANDOM_NUMBER ]]
  then
    GUESS_NUMBER "It's higher than that, guess again:"
  # check if number is higher
  elif [[ $NUMBER -gt $RANDOM_NUMBER ]]
  then
    GUESS_NUMBER "It's lower than that, guess again:"
  # insert if guess is correct
  else
    INSERT_GAME_SCORE=$($PSQL "INSERT INTO game_info(game_score, user_id) VALUES($GUESS_COUNT, $USER_ID)")
    echo "You guessed it in $GUESS_COUNT tries. The secret number was $RANDOM_NUMBER. Nice job!"
  fi
}

START_GAME() {
  GENERATE_RANDOM_NUMBER
  echo "Enter your username:"
  read USERNAME
  # get user info
  USER_ID=$($PSQL "SELECT user_id FROM user_info WHERE username='$USERNAME'")
  if [[ -z $USER_ID ]]
  then
    # if user does not exists
    INSERT_USER=$($PSQL "INSERT INTO user_info(username) VALUES('$USERNAME')")
    USER_ID=$($PSQL "SELECT user_id FROM user_info WHERE username='$USERNAME'")
    echo "Welcome, $USERNAME! It looks like this is your first time here."
    GUESS_NUMBER "Guess the secret number between 1 and 1000:"
  else
    # if user exists
    GAMES_PLAYED=$($PSQL "SELECT COUNT(*) FROM game_info WHERE user_id=$USER_ID")
    BEST_GAME=$($PSQL "SELECT MIN(game_score) FROM game_info WHERE user_id=$USER_ID")
    echo "Welcome back, $USERNAME! You have played $(echo $GAMES_PLAYED | sed 's/^ *//g') games, and your best game took $(echo $BEST_GAME | sed 's/^ *//g') guesses."
    GUESS_NUMBER "Guess the secret number between 1 and 1000:"
  fi
}

START_GAME