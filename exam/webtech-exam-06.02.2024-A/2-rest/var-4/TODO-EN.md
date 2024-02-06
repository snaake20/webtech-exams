#Subject 3 (2.5 pts)
#TOPIC: REST

# Given the application `app` fill in the `GET` method to the `/people` address to implement a simple sorting mechanism:

# Detailed points
- If no parameter has been sent, all records will be returned with a code of `200`; (0.5 pts)
- If `sortField` does not exist the server will return  `{"message": "cannot sort on non existent field"}`. The response code will be `400`; (0.5 pts)
- If `sortOrder` does not have a valid value (`ASC` or `DESC`)  the server will respond with `{"message": "sort order must be one of asc and desc"}`. The response code will be: `400`; (0.5 pts)
- Sorting works with a sort field and ascending order; (0.5 pts)
- Sorting works with a sort field and descending order. (0.5 pts)
