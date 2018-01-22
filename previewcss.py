from sys import argv
import os
import cssutils

def processCSS(myfile):
    cssFile = open(myfile)
    css = cssFile.read()

    sheet = cssutils.parseString(css)

    # pagesheet.encoding = 'ascii'
    # pagesheet.namespaces['xhtml'] = 'http://www.w3.org/1999/xhtml'
    # pagesheet.namespaces['atom'] = 'http://www.w3.org/2005/Atom'
    # pagesheet.add('atom|title {color: #000000 !important}')
    # pagesheet.add('@import "sheets/import.css";')

    newsheet = ""

    for rule in sheet:
        if rule.type == rule.STYLE_RULE:
            newparrule = rule.selectorText + " {" + "\n"
            for property in rule.style:
               newparrule = newparrule + property.name + ": " + property.value + ";\n"
            newparrule = newparrule + "}\n"
            newsheet = newsheet + newparrule
        elif rule.type == rule.PAGE_RULE:
            newparrule = ""
            myselector = rule.selectorText
            newselector = ""
            if not myselector:
                newselector = ".bookpage"
            elif myselector == ":left" or myselector == ":right":
                newselector = myselector.replace(":left",":nth-child(odd)").replace(":right",":nth-child(even)")
                newselector = ".bookpage" + newselector
            else:
                newselector = myselector.replace(":left",":nth-child(odd)").replace(":right",":nth-child(even)")
                newselector = ".PAGERULE" + newselector
            newparrule = newselector + " {" + "\n"
            for property in rule.style:
                if property.name == 'size':
                    sizeArr = property.value.split(" ")
                    newWidth = sizeArr[0]
                    newHeight = sizeArr[1]
                    tmpselector = newselector.replace(".bookpage", "")
                    newparrule = ".bookpreview" + tmpselector + " {\nwidth: " + newWidth + ";\n" + "height: " + newHeight + ";\n}\n" + newparrule
                else:
                    newparrule = newparrule + property.name + ": " + property.value + ";\n"
            newparrule = newparrule + "}\n"
            newsheet = newsheet + newparrule
            # get the nested page margin rules
            for nestedrule in rule:
                if nestedrule.type == nestedrule.MARGIN_RULE:
                    newchildrule = ""
                    childselector = nestedrule.margin.replace("@",".MARGINRULE")
                    childselector = newselector + " " + childselector
                    childselector = childselector.replace("bookpage","bookpreview")
                    newchildrule = childselector + " {" + "\n"
                    for property in nestedrule.style:
                        newchildrule = newchildrule + property.name + ": " + property.value + ";\n"
                    newchildrule = newchildrule + "}\n"
                    newsheet = newsheet + newchildrule
            rule.deleteRule
    return newsheet

newcss = processCSS(argv[1])

newfile = open('PRINTPREVIEW__pdf.css', 'w')
newfile.write(newcss)
newfile.close()