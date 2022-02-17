const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
 ];
 
 const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
 
 
 /**
 Higher Order function accept a function as a parameter or return a function.
 */
 
 // forEach
 
 /*
 for (let i = 0; i < companies.length; i++) {
    console.log(companies[i]);
 }
 */
 /*
 companies.forEach(function (company) {
    console.log(company);
 });
 */
 
 //companies.forEach(company => console.log(company));
 
 // filter
 
 let canVote = [];
 /*
 for (let i = 0; i < ages.length; i++) {
    if (ages[i] >= 18)
       canVote.push(ages[i]);
 }
 
 console.log(canVote);
 console.log(ages);
 */
 /*
 canVote = ages.filter(function (age) {
    return age >= 18;
 });
 */
 /*
 canVote = ages.filter(age => age >= 18);
 console.log(canVote);
 */
 
 //let techCompanies = companies.filter(company => company.category === 'Technology');
 //console.log(techCompanies);
 
 // display only the companies that existed in the 1980s
 
 /*
 let techCompanies = companies.filter(company => company.start >= 1980 && company.end < 1990);
 console.log(techCompanies);
 */
 // sort
 // sort the ages
 /*
 const sortAges = ages.sort(function (a, b) {
    return a - b;
 });
 
 
 const sortAges2 = ages.sort((a, b) => a - b);
 console.log(sortAges2);
 
 // Works similar to compareTo
 const sortAges3 = ages.sort(function (a, b) {
    if (a > b)
       return 1;
    else if (b > a)
       return -1;
    else
       return 0
 })
 console.log(sortAges3);
 */
 /*
 // sort companies based on start year
 const sortedCompanies1 = companies.sort((a, b) => a.start - b.start)
 console.log(sortedCompanies1);
 
 
 // sort companies based on category
 const sortedCompanies2 = companies.sort((a, b) => {
    return (a.category > b.category) ? 1 : (a.category === b.category ? 0 : -1);
 })
 
 console.log(sortedCompanies2);
 */
 // map
 //const companyNames = companies.map(company => company.name);
 //console.log(companyNames);
 /*
 const companyInfo = companies.map(company => `${company.name} (${company.start} - ${company.end})`);
 console.log(companyInfo);
 
 const test = ages.map(() => 4)
 console.log(test);
 */
 // reduce
 
 
 
 // let ageSum = 0;
 // for(let i = 0; i < ages.length; i++) {
 //   ageSum += ages[i];
 // }
 
 
 // Syntax: array.reduce(callback, initialValue)
 // total is previous reduced value and age is current element
 /*const ageSum = [1, 2, 3].reduce(function (total, age) {
    return total + age;
 }, 0);
 
 console.log(ageSum);
 */
 /*
 const totalYears = companies.reduce((total, company) => total + (company.end - company.start), 0);
 
 console.log(totalYears);
 */
 /*
 const str = ['a', 'b', 'c'].reduce((prev, curr) => prev + curr, '');
 console.log(str);
 */
 
 const ages = ages
    .map(age => age * 2)
    .filter(age => age >= 40)
    .sort((a, b) => a - b);
 /*.reduce((a, b) => a + b, 0);*/
 
 console.log(combined);

 