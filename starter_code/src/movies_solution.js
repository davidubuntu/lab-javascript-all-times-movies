/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
    return movies.map(function(movie) {
      var newDuration = "";
      if (!movie.duration.includes("h")) {
        newDuration = parseInt(movie.duration);
      } else if (!movie.duration.includes("min")) {
        newDuration = parseInt(movie.duration) * 60;
      } else {
        var durationArray = movie.duration.split(" ");
        newDuration =
          parseInt(durationArray[0]) * 60 + parseInt(durationArray[1]);
      }
      return Object.assign({}, movie, { duration: newDuration });
    });
  }
  
  // Get the average of all rates with 2 decimals
  function ratesAverage(movies) {
    return movies.reduce(function(acc, movie) {
      if (movie.rate) {
        return (acc += parseFloat(
          (parseFloat(movie.rate) / movies.length).toFixed(2)
        ));
      } else {
        return acc;
      }
    }, 0);
  }
  
  // Get the average of Drama Movies
  function dramaMoviesRate(movies) {
    var dramaArray = movies.filter(function(movie) {
      return movie.genre.includes("Drama");
    });
    if (dramaArray.length == 0) return undefined;
    return ratesAverage(dramaArray);
  }
  
  // Order by time duration, in growing order
  function orderByDuration(movies) {
    return movies.sort(function(movie1, movie2) {
      if (movie1.duration - movie2.duration == 0) {
        return movie1.title.localeCompare(movie2.title);
      } else {
        return movie1.duration - movie2.duration;
      }
    });
  }
  
  // How many movies did STEVEN SPIELBERG
  function howManyMovies(movies) {
    if (movies.length == 0) return;
    var newArray = movies.filter(function(movie) {
      return (
        movie.genre.includes("Drama") &&
        movie.director.includes("Steven Spielberg")
      );
    }).length;
    return "Steven Spielberg directed " + newArray + " drama movies!";
  }
  
  // Order by title and print the first 20 titles
  function orderAlphabetically(movies) {
    var sortedArray = movies.sort(function(movie1, movie2) {
      return movie1.title.localeCompare(movie2.title);
    });
    var titlesArray = sortedArray.map(function(movie) {
      return movie.title;
    });
    console.log(titlesArray);
    return titlesArray.splice(0, 20);
    // return movies
    //   .sort(function(movie1, movie2) {
    //     return movie1.title.localeCompare(movie2.title);
    //   })
    //   .map(function(movie) {
    //     return movie.title;
    //   })
    //   .splice(0, 20);
  }
  // Best yearly rate average
  function bestYearAvg(movies) {
    if (movies.length == 0) return;
    var bestYear = "";
    var bestRate = 0;
    movies.forEach(function(movie) {
      var sameYearMovies = movies.filter(function(movieFilter) {
        return movieFilter.year == movie.year;
      });
  
      var rate = ratesAverage(sameYearMovies);
  
      if (rate >= bestRate) {
        bestRate = rate;
        bestYear = movie.year;
      }
    });
    return (
      "The best year was " + bestYear + " with an average rate of " + bestRate
    );
  }


//   Diego Méndez Peño [20:14]
// Chicos os paso la última función evitando que repita la comprobación si un año ya lo ha calculado anteriormente
  // Best yearly rate average
  function bestYearAvg(movies) {
      if (movies.length == 0) return;
      var bestYear = "";
      var bestRate = 0;
      var checkedYears = []
      movies.forEach(function(movie) {
        if (!checkedYears.includes(movie.year)) {
          var sameYearMovies = movies.filter(function(movieFilter) {
            return movieFilter.year == movie.year;
          });

          var rate = ratesAverage(sameYearMovies);

          if (rate >= bestRate) {
            bestRate = rate;
            bestYear = movie.year;
          }
          checkedYears.push(movie.year);
        }
      });
      return (
        "The best year was " + bestYear + " with an average rate of " + bestRate
      );
    }