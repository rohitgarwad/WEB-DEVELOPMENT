#! /bin/bash

PSQL="psql -X --username=freecodecamp --dbname=periodic_table --tuples-only -c"

PRINT_ELEMENT_INFO() {
  if [[ -z $1 ]]
  then
    echo "I could not find that element in the database."
  else
    # extract variables
    echo "$1" | while read TYPE_ID BAR ATOMIC_NUMBER BAR SYMBOL BAR NAME BAR ATOMIC_MASS BAR MELTING_POINT_CELSIUS BAR BOILING_POINT_CELSIUS BAR TYPE
    do
      echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT_CELSIUS celsius and a boiling point of $BOILING_POINT_CELSIUS celsius."
    done
  fi
}

GET_ELEMENT_INFO() {
  if [[ $1 ]]
  then
    if [[ $1 =~ ^[0-9]+$ ]]
    then
      # get element info using atomic_number
      ATOMIC_NUMBER=$1
      ELEMENT_INFO=$($PSQL "SELECT * FROM elements INNER JOIN properties USING(atomic_number) INNER JOIN TYPES USING(type_id) WHERE atomic_number=$ATOMIC_NUMBER")
      PRINT_ELEMENT_INFO "$ELEMENT_INFO"
    elif [[ ${#1} -le 2 ]]
    then
      # get element info using symbol
      SYMBOL=$1
      ELEMENT_INFO=$($PSQL "SELECT * FROM elements INNER JOIN properties USING(atomic_number) INNER JOIN TYPES USING(type_id) WHERE symbol='$SYMBOL'")
      PRINT_ELEMENT_INFO "$ELEMENT_INFO"
    else
      # get element info using name
      NAME=$1
      ELEMENT_INFO=$($PSQL "SELECT * FROM elements INNER JOIN properties USING(atomic_number) INNER JOIN TYPES USING(type_id) WHERE name='$NAME'")
      PRINT_ELEMENT_INFO "$ELEMENT_INFO"
    fi
  else
    echo "Please provide an element as an argument."
  fi
}

GET_ELEMENT_INFO $1