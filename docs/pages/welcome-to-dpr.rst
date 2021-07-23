Welcome to the Digital Pali Reader
==================================

This is the help file, to help you get started using the Digital Pali
Reader for the first time.

Introduction
------------

The Digital Pali Reader (DPR) is a tool, much like a hard-copy language
reader, facilitating study of the Pali language at an advanced level. It
contains the entire Myanmar version of the Pali Tipitaka as found on the
Vipassana Research Institute's CSCD 3, as well as commentaries and
sub-commentaries where available. It also includes the Visuddhimagga,
Abhidhammatthasangaha and several ancient grammatical texts composed in
Pali, all available for analysis and translation. Additionally, it is
possible to install the Thai Tipitaka and commentaries (a work in
progress) as an alternative to the VRI tipitaka.

Rather than offering a translation for the text being read, the DPR is
like an ordinary text reader, in that it presents the untranslated texts
and offers tools to assist in reading the original language. The idea is
that it it is better to learn the language than to read translations,
and better to learn the language by actively reading the original texts
than by simply memorizing charts or vocabulary.

The DPR differs from an ordinary reader in several respects:

1. The DPR allows for instant analysis and lookup of words and
   compounds, simply by clicking on a word in the passage being read.
   This avoids time spent looking for the word in a hard-copy dictionary
   or in another place on one's computer, and provides great assistance
   in analyzing complex words and compounds.
2. The DPR has a built in `text search <#text-search>`__ function
   similar to that of the CST4. The DPR provides great flexibility in
   searching multiple sets, multiple books, and multiple hierarchies of
   texts, as well as allowing advanced regular expression searches.
   There is also a built-in search of accesstoinsight.org's
   translations, either via the website or the off-line archive.
3. The DPR includes several dictionaries: Pali-English, Pali Proper
   Names, Concise Pali-English, Concise English-Pali, Sanskrit, and
   Sanskrit Roots. These may be searched individually or all together
   using the "Multi" option in the "Dictionary" section. There is also a
   searchable compilation of terms discussed in the commentaries and
   sub-commentaries, a title search for all books. All these can be
   directly accessed from the control panel under the "Dictionary"
   section. More information is available in the
   `Dictionary <#dictionary>`__ section below.

4. The dictionary files in the DPR were not designed specifically for
   the purpose at hand, and word-to-definition matches are sometimes
   incorrect due to imperfect analysis.
5. The DPR has a number of useful auxiliary features, including:

   -  `bookmarks <#bookmarking>`__ and quote clipboard for keeping
      important passages, and a history to keep track of recently viewed
      passages.
   -  `permalinks <#permalinks>`__ to each paragraph and search query
      for referencing passages and terms for other DPR users.
   -  links to and searching of
      `AccessToInsight.org <http://www.accesstoinsight.org/>`__'s list
      of translations
   -  a Pali conversion utility that converts to and from
      `Velthuis <#the-velthuis-scheme>`__ and Unicode scripts
   -  transliteration of Pali into Thai, Devanagari, Myanmar and Sinhala
      scripts
   -  conjugation lookup and tables
   -  basic sentence translation
   -  multiple Pali language quizzes to test your vocabulary and grammar
   -  daily and random English Dhamma quotes from Buddhavacana, by S.
      Dhammika

While the DPR is far from perfect, it is sure to be useful for
intermediate Pali students who wish to advance their studies to a higher
level. Below is a brief explanation of the various parts of the DPR.

--------------

Contents
--------

1. `Introduction <#introduction>`__
2. `Notes <#notes>`__
3. `Usage <#usage>`__

   -  `Tipitaka Lookup <#tipitaka-lookup>`__
   -  `Reading Text <#reading-text>`__
   -  `Bookmarking <#bookmarking>`__
   -  `Text Search <#text-search>`__
   -  `Dictionary <#dictionary>`__
   -  `Technical <#technical>`__

4. `Miscellany <#miscellany>`__

   -  `Permalinks <#permalinks>`__
   -  `Quick Links <#quick-links>`__
   -  `Right-Click Menu <#right-click-menu>`__
   -  `The Velthuis Scheme <#the-velthuis-scheme>`__

5. `Gratitude <#gratitude>`__
6. `Final Words <#final-words>`__

--------------

Notes
-----

-  You will need at least a basic unicode font to view the Pāḷi
   characters properly. If the word Pāḷi in this sentence shows up
   correctly, you are probably okay. Otherwise, you'll have to do a
   search for "Unicode Font" on the Internet, and probably tell the DPR
   to use that font in the preferences dialog. The default font is
   "Tahoma", which should display the characters correctly. For
   alternative scripts, it gets a little bit more difficult, and YMMV. I
   use `the Padauk
   font <http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=Padauk>`__
   for Burmese and it works well, and
   `Bhashitha <http://www.locallanguages.lk/sinhala_unicode_converters>`__
   seems to be the best for Sinhala. The rest of the scripts should work
   with any standard unicode font containing that script (google "Thai
   unicode font", etc.). There may be errors in the conversion still, so
   please send me (copy and paste in an email) any strange-looking words
   in regards to the alternative scripts.
-  You will also need a recent version of `Mozilla
   Firefox <http://www.getfirefox.com/>`__ . Older versions may have
   incompatibilities that I am not aware of.
-  Text entry fields accept either unicode Pali characters or characters
   based on the `Velthuis <#the-velthuis-scheme>`__ scheme.
-  The reader was created for my own personal use, but anyone is welcome
   to use or distribute what I have made for their own benefit or the
   benefit of others.
-  For the latest version of the reader, please visit
   `pali.sirimangalo.org <http://pali.sirimangalo.org/>`__
-  As of 2.0, the Myanmar Tipitaka is installed as an individual
   extension, in order to reduce the size of the main archive. Since the
   Tipitaka files are less frequently updated, this should improve the
   upgrade experience. The Thai Tipitaka is also available as an extra
   extension, and may be installed via the preferences dialog .
   Switching between the sets is accomplished via the main window's
   toolbar (see below).
-  Many common tasks are now mapped to keys, which may be used instead
   of the buttons themselves. For a list of these keys, press the 'k'
   key
-  If any problem arises in the functioning of the reader, just press F5
   to reset the reader
-  I reserve no copyright over any work that I have done, and offer no
   warranty of any kind for this software. If it breaks, you get to keep
   both pieces.

--------------

Usage
-----

The DPR is split up into tabs and a proper sidebar. The sidebar contains
the main controls, and opens other windows as needed. Most buttons that
interact with existing windows can also open new windows by CTRL+click
or middle-clicking on them. For instance, to open a section in a new
window, rather than the existing DPR Pali window, middle-click (or
CTRL+click) on the » button. Text search and dictionary lookup now have
their own tabs, and can be opened in multiple instances in the same way.

**SHIFT+click** opens content into a new panel in the current window, if
appropriate, allowing for side-by-side comparison of text.

Basic use of the DPR should require little explanation. What follows is
a brief explanation of all of the controls in the sidebar, by section:

Tipitaka Lookup
~~~~~~~~~~~~~~~

The top two sections on the control panel are for browsing through the
tipitaka and ancillary works. At the top, there are two lists, of sets
and books in each set. Below these, there are three buttons (M,A,T) for
changing the hierarchy of texts to be studied. "M" switches to the root
canonical text, "A" to the commentary, and "T" to the subcommentary.
Note that once a section has been retrieved, there will be buttons in
the toolbox for the corresponding section in the other two hierarchies,
if available.

Below this group, there is a button and a set of hierarchical lists of
the sections for the current book, with buttons beside each list. These
allow one to navigate to a specific section. The button at the top opens
a linked index of the selected set and book, with links to each section.
As for the rest, changing each will result in changes to the ones below.
All but the bottom list have a "≡" button beside them, which means it
will group all the sections in the hierarchy below it together and
display them all in the main window for analysis. The bottom list will
have a "»" button; clicking on this will open that section in the main
window for analysis.

Next, there is an input box for enter quick links to easily navigate to
a passage you already know the location for. For more on this, see
`quick links <#quick-links>`__, below.

Finally, there are two more lists: (-- History --) and (-- Bookmarks
--), with a history of previously viewed sections (max. 100) and a list
of currently stored bookmarks. Clicking on an entry retrieves that
section. Clicking on the buttons beside either list opens the
bookmark/history tab, with further options relating to bookmarks and
history.

Text View
~~~~~~~~~

Once you have retrieved a section of the text, it will display in the
main window, which is split into (at least) two frames. The top frame
(or frames) holds the actual text, the bottom serves as a dictionary
frame, as well as providing access to the convertor and text pad. Both
sections have their own toolbar, which is found by hovering over the "∴"
in the top-left corner of the frame. The toolbar for the top window may
contain any of the following tools:

-  ``convert`` ``export`` - send the selected text to the convertor or
   textpad (an easier way to do this is press the "s" or "e" (or E to
   append) key once you have highlighted some text).

-  ``⇐`` ``♦`` - transfer the current location back to the sidebar, or
   copy the permalink to the clipboard.

-  ``←`` ``↑`` ``→`` - forward and backward buttons to go to the next or
   previous section, and an up button to go to the curren text's index.

-  ``m`` ``a`` ``t`` - buttons to retrieve the corresponding section in
   the other hierarchies (m=mūl/canon; a=aṭṭhakathā/commentary;
   t=ṭika/sub-commentary)

-  ``†`` - bookmark the current section (see the bookmarks section
   below)

-  ``M`` ``T`` - buttons to switch between alternative versions (Thai or
   Myanmar) of the current section (if available). The sets can be
   installed via the preferences dialog .

-  ``x`` - close the current panel in a multi-panel display.

The bottom part of the main screen has six tabs on the left-hand side.
They can also be accessed via the 1-6 keys on the keyboard. Their
functions are as follows:

-  **D: Dictionary** - this frame is normally active when viewing a
   text. Clicking on a word in the text or analysis bar will display a
   definition from the PED or DPPN if available. Clicking on the small
   green "c" in the analysis frame will display conjugation or
   declension information if available.
-  **Cv: Conversion** - this frame contains two text boxes, the left one
   for input, the right one for output. There are three main functions:
   1) converting between Unicode and Velthuis; 2) converting from the
   Unicode Roman alphabet to a variety of Asian alphabets; and 3)
   sorting all words in a block of text into their Pāḷi alphabetical
   order. Converst by selecting an option in the "to" list. Sort by
   pressing the sort button.
-  **Tp: Textpad** - A simple text editor, with six buttons, as follows:
-  **Clear** removes all text from the textpad.
-  **Velthuis** converts the text to Velthuis.
-  **Unicode** converts the text to Unicode.
-  **Analyze** sends the texpad text to the top frame as if it were a
   regular text in the reader with each word being clickable for
   analysis.
-  **Copy** copies the textpad text to the system's clipboard.
-  **Save** brings up a file dialog to save the text as a file.
-  **Tr: Translation** - And experimental sentence translator.
-  **Cj: Conjugation** - A tool to conjugate or decline individual words
-  **Bv: Buddha Vacana** - A daily quote from Ven. Dhammika's The
   Buddha's Words . Clicking on the citation will put the Pāḷi in the
   top frame.

The main function of the DPR is to analyze individual words and give
appropriate definitions to each word or word part. Clicking on any word
in the text brings up an analysis of the word in the top part of the
bottom frame (the analysis bar) and hopefully at least one (hopefully
correct) definition from one of the three dictionaries. If there are
alternative ways of splitting up a compound, they can be accessed via a
menu at the bottom left of the analysis bar, below the current analysis.
The right side of the analysis bar shows a definition from the CPED of
the first part of the analysis; the rest can be accessed via a menu at
the bottom right of the analysis bar, below the current CPED definition.

Bookmarking
~~~~~~~~~~~

The DPR allows saving bookmarks for later reference. All bookmark files
are saved in an XML file in your firefox profile folder under "DPR".
Clicking on the ☆ button opens up an advanced bookmark manager where you
can view/add descriptions, change names, and delete bookmarks, as well
as edit or clear the history box (see above).

Text Search
~~~~~~~~~~~

The DPR has a built-in text search function that allows flexible search
of the tipitaka and ancillary texts, via the "Text Search" section of
the control panel. There are many search options available, based on two
variables: 1) whether you wish to search multiple sets, multiple books
in the current collection, or the current book; and 2) whether you wish
to search the current hierarchy or multiple hierarchies. There is also
an option ("Translations" in the drop-down menu) to access the
`AccessToInsight.org <http://www.accesstoinsight.org/>`__ Google custom
search, or the off-line archive (if installed and linked via the options
page) to search their English translations.

If you wish to search within the current set, book, or hierarchy, first
navigate to the appropriate place using the corresponding lists and
buttons. If you are searching multiple collections or the Tipitaka, they
will have no effect.

Next, enter the string for which to search (or multiple strings
seperated by the "+" sign) and then select a search type from the
dropdown (set at "Tipitaka" by default). You will notice that various
options appear based on the type of search you choose. Check the
appropriate boxes, and then click the » button. A search tab will open
once you click this button (or press enter while focus is on the text
box) and search results will begin to appear, with words containing the
search term(s) at the top, followed by a list of paragraphs with the
matched search term(s) highlighted. There is a stop button that allows
you to interrupt the search if necessary.

Once the search is complete, clicking on a search term will hide all
other paragraphs, showing only paragraphs containing the selected term.
To show all results again, click the "x" beside the current word (in a
box on the top right of the search frame, when viewing a single matched
word). Clicking on the ``go`` button beside a paragraph will open the
containing section in the Pali tab (or open a new tab, on middle-click
or CTRL+click).

The "RegEx" checkbox allows javascript regular expressions to be used in
the search (use with care!).

To search for a page number, use the following syntax: P1.0001, P1.0002,
etc., where "P" (or V, M, T) is the PTS pagination set, the first "1" is
the volume, and the following (must be four digits) is the page number.

At the bottom of the Search pane, there is a history list with past
searches for easy repetition.

Dictionary
~~~~~~~~~~

The dictionary lookup has nine options, some with advanced options
available by clicking "adv". "DPR" runs an analysis on the word or
passage at hand as it normally would. This only works for full words and
phrases. "PED" searches the Pali-English Dictionary, "DPPN" the
Dictionary of Pali Proper Names, "CPED" the Concise Pali-English
Dictionary, and "CEPD" the Concise English-Pali Dictionary. "Aṭṭha"
(Aṭṭhakathā) and "Ṭīkā", search through words or phrases explained in
the commentaries and sub-commentaries respectively. "Title" gives a list
of matching titles in all books.

**Advanced Dictionary options:**

Each dictionary has its own set of advanced options, some in common,
some unique. All are explained here:

-  **Reg. Exp.:** Allows javascript regular expressions to be used in
   the dictionary search.
-  **Fuzzy:** This option allows you to ignore diacritics in your
   search. This equates long and short vowels, and ignores dots and the
   tilde.
-  **Full Text:** Only for the dictionaries (PED, DPPN, CPED, CEPD),
   this allows full-text search, rather than searching just the entry
   titles.
-  **Start of Word Only:** Enabled by default for the dictionaries, this
   limits the search to matches at the beginning of the word. To search
   within entries, uncheck this.

If search-as-you-type is enabled in the option screen (see below), the
results will be shown as you type. Otherwise, you will have to press the
``»`` button to execute the search. If you choose "PED" and type "aa"
into the box, for example, it will come up with a list of Pali-English
Dictionary entries starting with a long "ā". All lookup functions except
DPR allow inner-word search and javascript-type regular expressions
(wildcards) in advanced options. Note that these disable
search-as-you-type.

At the bottom of the Dictionary pane, there is a history list with past
lookups for easy repetition.

Technical
~~~~~~~~~

The last set of buttons on the Tools pane provide miscellaneous tools:

**Bookmarks** - as mentioned, this opens the bookmark window.

**Pali Quiz** - this button opens a set of Pali quizes to test your
vocabulary and grammar.

**Dhamma Quote** - this button displays a random quote from the book,
Buddhavacana.

**Grammar** - opens the Pali Grammar by Charles Duroiselle.

**Cheat Sheet** - open's Alan McClure's Pali Cheat Sheet.

**Preferences** - this button opens the preferences dialog , allowing
one to adjust the layout and colors of the reader as well as other misc.
options, via three tabs as follows:

    **General:**

    -  **Show in text** allows you to show or hide page numbers, variant
       readings and permalinks (♦) in the text, as well as turn off
       internal PED linking and DPPN links for section titles.
    -  "Show translations" adds links to translations from
       accesstoinsight.org as well as ancient-buddhist-texts.org, if
       available. If you have downloaded the ATI offline archive, you
       can specify the location here, which will also enable off-line
       ATI search.
    -  "Enable Dictionary search-as-you-type" causes the dictionaries to
       start outputting results as you type. Otherwise, pressing "Enter"
       or clicking the » button is required.

    **Layout:** Specify colors or images of the various parts of the
    reader, using css notation. Some examples are given in the default
    preferences, including gradients and url-based images.

    **Text:** Specify colors, either by name or HTML code ("black" is
    the same as "#000" and "#000000). Specify font family for the text,
    size of the normal text and the script to be used for reading the
    texts.

    **Sets:** Install alternative Tipitaka sets, to be accessed via the
    main window's toolbar (see above).

**Feedback Form** - this button allows you to contact me via email.

**Help** - this button shows this help file

--------------

Miscellany
----------

Permalinks:
~~~~~~~~~~~

A permalink is a special URL that, when entered in the Firefox address
bar or clicked from a hyperlink (provided the DPR is installed), goes
directly to the place it refers to, showing the results of a search, if
specified. The structure for DPR permalinks is currently:
**dpr:type[?params]** , where "type" is either one of "index" (for
tipitaka sections), "search" (for tipitaka searches) or "dict" (for
dictionary lookups), each of which has associated parameters which
should be added after the "?", or else any htm file in the
chrome://digitalpalireader/content/ directory, in which case there will
be no parameters (or "?"). The parameters refer to everything in the
page's url string after the "?".

The "♦" button signifies a permalink, and is found in several places:

-  in the index for a given book,
-  in the main window toolbox,
-  to the left of each paragraph.
-  in the top-left corner of the search and dict windows.

Clicking on a "♦" button causes the link to be copied to the clipboard
for further use. The "♦" button at the beginning or each paragraph adds
the paragraph number to the link. Some example permalinks are:

-  **An index permalink:**

DN 1 Index *(dpr:index?loc=d.0.m)*

-  **A section permalink:**

DN 1, paragraph 4, with "bhagavaa" and "bhikkhave" highlighted
*(dpr:index?loc=d.0.0.0.0.0.0.m&para=4&query=bhagavaa+bhikkhave)*

-  **A multi-panel permalink:**

DN 1, paragraph 4, with "bhagavaa" and "bhikkhave" highlighted in the
first panel, the commentary in the second panel, and the ATI translation
in the third panel.
*(dpr:index?loc=d.0.0.0.0.0.0.m&query=bhagavā+bhikkhave&para=4\|loc=d.0.2.0.0.0.0.a\|ati=dn/dn.01.0.bodh.html)*

-  **A search query permalink:**

Search DN for "bhagavaa" and "bhikkhave"
*(dpr:search?type=0&query=bhagavaa+bhikkhave&MAT=m&set=d&book=1&part=1&rx=false)*

-  **A dictionary lookup permalink:**

Lookup words starting with "bhaga" in PED
*(dpr:dict?type=PED&query=bhaga&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd)*

-  **A permalink to this help file:**

Help *(dpr:help)*

**Note:** Shorthand sutta references of the sort found on
accesstoinsight.org or suttacentral.net, of the form "DN 1.1", etc. (see
quick links, below), may be used to replace the standard "loc="
notation, replacing the space with a dot, e.g. "DN.1.1". For example:

dpr:index?loc=DN.1.1&para=4&query=bhagavaa+bhikkhave

is the same as

dpr:index?loc=d.0.0.0.0.0.0.m&para=4&query=bhagavaa+bhikkhave

Quick Links:
~~~~~~~~~~~~

Shorthand sutta references are shown for the first four nikayas of the
sutta pitaka and most of the fifth nikaya. To quickly navigate to a
specific sutta, section, etc., use the 'q' keyboard shortcut from a main
DPR tab, or use the 'Quick Link' text box in the sidebar. Quick links
are of two forms, as follows:

1. 'DN1.1', 'MN1', etc., comprised of the first letter of the nikaya
   (D,M,S,A, or K), then an N, then the first reference number, then a
   period, then the second reference number. The N is now optional, so
   D1.1 also works.

2. For the first fifteen books in the Khuddaka Nikaya, the following
   syntax is also recognized: 'dhp1', 'it1', etc., comprised of the
   shorthand name for that book, followed by the reference number. The
   shorthand names for the books are, in order:

   'khp','dhp','ud','it','snp','vv','pv','th','thi','apa','api','bv','cp','ja'

   Note, for the Jataka (ja), this syntax represents the jataka number
   across books 14 and 15, so 'ja547' will open the last jataka in book
   15 (Jat. 2), whereas 'ja520' will open the last jataka in book 14
   (Jat. 1).

3. For the Dhammapada, verse numbers are also recognized, using 'dhpv'
   followed by the verse number, e.g.: 'dhpv1', 'dhpv423', etc.

Right-Click Menu:
~~~~~~~~~~~~~~~~~

The DPR adds an entry to Firefox's right-click context menu that allows
quick access to many of the DPR's functions from anywhere on the
Internet. Most functions require text to be highlighted, but some allow
right-clicking on an entire text box, to convert the contents to/from
Unicode, for example. This behaviour can be tweaked from the preferences
menu General tab.

The Velthuis Scheme:
~~~~~~~~~~~~~~~~~~~~

.. raw:: html

   <table cellspacing="0" cellpadding="3" border="2">
     <tbody>
       <tr>
         <td rowspan="15" valign="top">
           <p>

Double the vowels, Punctuate the consonants

.. raw:: html

   </p>
           <p>
             

This scheme was originally developed in 1991 by Frans Velthuis for use
with his devnag Devanagari font, designed for the TeX typesetting
system. Pali and Sanskrit scholars have since adopted it as a standard
technique in Internet correspondence.

.. raw:: html

   </p>
           <p>

In the Velthuis scheme, two basic rules are observed:

.. raw:: html

   </p>
           <p>
             

1. Long vowels (those with a macron (bar) above them) are doubled: aa,
   ii, uu.

   .. raw:: html

      </p>
              <p>
            

   2. For consonants, the diacritic mark precedes the letter it affects.
      Thus, the retroflex (cerebral) consonants (those with a dot
      underneath) are: .r .t .th .d .dh .n .m .s .l. The guttural nasals
      (m with a dot below or n with a dot above) are represented by "m
      and "n. The palatal nasal (n with a tilde) is ~n.

      .. raw:: html

         </p>
             <p>
               

      The scheme is precise, although it takes a while to get used to.
      Here is a table of the affected Pali letters in both unicode form
      and Velthuis scheme.

      .. raw:: html

         </p>
           </td>
           <td>

      Unicode

      .. raw:: html

         </td>
           <td>

      Velthuis

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td colspan="2" align="center">

      (Long vowels)

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td align="center">

      ā

      .. raw:: html

         </td>
           <td align="center">

      aa

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td align="center">

      ī

      .. raw:: html

         </td>
           <td align="center">

      ii

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td align="center">

      ū

      .. raw:: html

         </td>
           <td align="center">

      uu

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td colspan="2" align="center">

      (Consonants)

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td align="center">

      ṅ

      .. raw:: html

         </td>
           <td align="center">

      "n

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td align="center">

      ñ

      .. raw:: html

         </td>
           <td align="center">

      ~n

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td align="center">

      ṭ

      .. raw:: html

         </td>
           <td align="center">

      .t

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td align="center">

      ṭh

      .. raw:: html

         </td>
           <td align="center">

      .th

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td align="center">

      ḍ

      .. raw:: html

         </td>
           <td align="center">

      .d

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td align="center">

      ḍh

      .. raw:: html

         </td>
           <td align="center">

      .dh

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td align="center">

      ṇ

      .. raw:: html

         </td>
           <td align="center">

      .n

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td align="center">

      ḷ

      .. raw:: html

         </td>
           <td align="center">

      .l

      .. raw:: html

         </td>
         </tr>
         <tr>
           <td align="center">

      ṃ

      .. raw:: html

         </td>
           <td align="center">

      .m

      .. raw:: html

         </td>
         </tr>
           </tbody>
         </table>

--------------

Gratitude
---------

Thanks first and foremost to Alexander Genaud, without whose initial
help there would be no DPR. Special thanks also to Ven. Khemaratana for
pointing out numerous bugs, offering useful suggestions and helping
greatly with the DPPN, among other things. Thanks also to Alan McClure,
Ven. Gavesako, Peter Masefield, Lin Qian, and Leland George for spotting
errors in the script and offering encouragement and suggestions. Thanks
to John Bullit for his link on
`www.accesstoinsight.org <http://www.accesstoinsight.org/outsources/pali.html>`__
as well as for graciously hosting a PHP script providing the list of
sutta translations used by the DPR and a means of allowing the DPR's
offline ATI search. And thanks to everyone else who helped out in the
project in any small or large way - sotthi vo hotu.

Special impersonal credit is due to all of those people involved in
creating and providing publicly-available electronic versions of the
following resources:

-  The Myanmar Pali Tipitaka (VRI)
-  The Thai Pali Tipitaka (Internet Source)
-  The Pali English Dictionary (PTS)
-  Concise Pali English Dictionary (Buddhadatta)
-  Concise English Pali Dictionary (Buddhadatta)
-  Dictionary of Pali Proper Names (Malalasekera)
-  Sanskrit-English Dictionary (Monier-Williams)
-  Sanskrit Roots (Whitney)
-  PaliLookup (?)
-  Buddha Vacana (Dhammika)

Should this software infringe upon anyone's felt right to forbid the
copying of any of the above or other materials, I apologize for the felt
violation. I am sorry to know that some people feel this way about
generally useful things that benefit the public immensely when
distributed freely. May all be happy and well.

--------------

Final Words
-----------

1. Please write to me any errors you may find, big or small. My email is
   yuttadhammo@gmail.com .

2. Please check the `DPR Homepage <http://pali.sirimangalo.org/>`__ for
   updates.

3. Please visit the `DPR Forum <http://pali.sirimangalo.org/forum/>`__
   to ask questions about the DPR and the Pali language in general.

Best wishes and good luck,

Yuttadhammo
