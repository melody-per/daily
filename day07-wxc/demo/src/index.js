import $ from "jquery"
$(function () {
    $('ul li:even').style('background', 'pink')
    $('ul li:odd').style('background', 'skyblue')
})