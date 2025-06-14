document.addEventListener('shopify:section:select', (event)=> {
    console.log(event);
    console.log('section selected');
});
document.addEventListener('shopify:section:deselect', (event)=> {    
    console.log(event);
    console.log('section deselected');
});