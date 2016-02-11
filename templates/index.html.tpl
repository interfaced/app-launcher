<!DOCTYPE html>
<html>
<head>
	<title>ZombieBox</title>
	<meta charset="utf-8">
	<script>CLOSURE_NO_DEPS=true;</script>
	<!-- styles -->
	<link rel="stylesheet" href="fonts.css">
	<% if (styles.length) {
	print('<link rel="stylesheet" href="' + styles.join('">\n\t<link rel="stylesheet" href="') + '">');
	} %>
	<% if (inlineStyles.length) {
	print('<style>' + inlineStyles.join('</style>\n\t<style>') + '</style>');
	} %>
	<!-- scripts -->
	<% if (scripts.length) {
	print('<script src="' + scripts.join('"></script>\n\t<script src="') + '"></script>');
	} %>
	<% if (inlineScripts.length) {
	print('<script>' + inlineScripts.join('</script>\n\t<script>') + '</script>');
	} %>
</head>
<body></body>
</html>
