#Subiect 3 (2.5 pts)
#TOPIC: REST

# Dată fiind aplicația `app` completați metoda `GET` la adresa `/people` pentru a implementa un mecanism simplu de sortare:

# Punctaj defalcat
- Dacă nu s-a trimis niciun parametru se vor returna toate înregistrările cu un cod `200`; (0.5 pts)
- Daca parametrul `sortField` este un câmp inexistent serverul va răspunde cu  `{"message": "cannot sort on non existent field"}`. Codul de răspuns va fi: `400`; (0.5 pts)
- Daca parametrul `sortOrder` nu are o valoare validă (`ASC` sau `DESC`)  serverul va răspunde cu  `{"message": "sort order must be one of asc and desc"}`. Codul de răspuns va fi: `400`; (0.5 pts)
- Sortarea funcționeaza cu un câmp de sortare și ordine ascendentă; (0.5 pts)
- Sortarea funcționeaza cu un câmp de sortare și ordine descendentă. (0.5 pts)
