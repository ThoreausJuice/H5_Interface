with open('开头.html', 'r', encoding='utf-8') as beginning:
    beginning_string = beginning.read()

with open('结尾.html', 'r', encoding='utf-8') as end:
    end_string = end.read()

with open('dashboard\index.html', 'w', encoding='utf-8') as new_html:
    new_html.write(beginning_string)
    with open('202101测试用.csv', 'r', encoding='utf-8') as middle:
        middle_string = middle.read().split('\n')
        new_html.write('<thead>\n<tr>\n')
        for a in middle_string[0:1]:
            new_html.write('<tr>')
            for b in a.split(','):
                new_html.write('<th>')
                new_html.write(b)
                new_html.write('</th>\n')
            new_html.write('</tr>\n')
        new_html.write('</tr>\n</thead>\n')
        new_html.write('<tbody>\n')
        for z in middle_string[1:10]:
            new_html.write('<tr>')
            for y in z.split(','):
                new_html.write('<td>')
                new_html.write(y)
                new_html.write('</td>\n')
            new_html.write('</tr>\n')
        new_html.write('</tbody>\n')
        new_html.write(end_string)