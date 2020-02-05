/**
 * Finviz - macro class
 * 
 * Stock screener for investors and traders, financial visualizations.
 * 
 * @copyright 2020 Beplas Studio
 *
 * @license MIT
 *
 * @package finviz
 * @version 1.0
 * @author  Beplas Studio <alip@beplasstudio.com>
 * @link    https://beplasstudio.com/
 */
function finviz_render()
{
    var findAllFinviz = function (regexPattern, sourceString) {
        let output = []
        let match

        let regexPatternWithGlobal = RegExp(regexPattern, "g")
        while (match = regexPatternWithGlobal.exec(sourceString)) {
            delete match.input
            output.push(match)
        }
        return output
    }
    var getFinvizAttributesFromText = function (html_string, prefix, open_tag = '{', close_tag = '}')
    {
        var attrs = [];
        var regex = open_tag + prefix + '([^}]+)' + close_tag;

        var matches = findAllFinviz(regex, html_string);
        if (matches.length > 0) {
            for (var i = 0; i < matches.length; i++) {
                var str_attr = matches[i][1];

                var extra_attrs = findAllFinviz(/\s+(?=.*symbol="([^\s+]+)"|)(?=.*type="([^\s+]+)"|)(?=.*advance="([^\s+]+)"|)(?=.*timeframe="([^\s+]+)"|).+$/, str_attr);

                if (extra_attrs.length > 0) {
                    var obj = {};
                    for (var x = 0; x < extra_attrs.length; x++) {
                        obj.attributes = {
                            symbol: extra_attrs[x][1],
                            type: extra_attrs[x][2],
                            advance: extra_attrs[x][3],
                            timeframe: extra_attrs[x][4]
                        };
                    }
                    obj.macro = matches[i][0];
                    attrs.push(obj);
                }
            }
            return attrs;
        }
        return null;
    }
    var processFinvizText = function ()
    {
        var text = $('[itemprop="articleSection"]')[0].innerHTML;
        var insert_macros = getFinvizAttributesFromText(text, 'insertstockquote');
        if (insert_macros) {
            for (var i = 0; i < insert_macros.length; i++) {
                var attrs = insert_macros[i].attributes;
                var macro = insert_macros[i].macro;
                var advance = (attrs.advance === 'true' || attrs.advance !== undefined) ? 1 : 0;
                var type_attr = (attrs.type !== undefined) ? attrs.type : 'candle';

                var ty = {candle: 'c', line: 'l'};
                var type = ty[type_attr];

                var tm = {daily: 'd', weekly: 'w', monthly: 'm'};
                var timeframe = 'd';
                timeframe = attrs.timeframe !== undefined ? tm[attrs.timeframe] : 'd';

                if (timeframe == 'm' || timeframe == 'w') {
                    type = 'c';
                    timeframe = 'd';
                }

                if (attrs.symbol != undefined)
                {
                    var img = '<img id="chart' + i + '" src="https://finviz.com/chart.ashx?t=' + attrs.symbol + '&ty=' + type + '&ta=' + advance + '&p=' + timeframe + '&s=l" alt="' + attrs.symbol + '" height="340" border="0">';

                    text = text.replace(macro, img);
                }
            }
        }
        //hover
        var hover_macros = getFinvizAttributesFromText(text, 'stockquotehover');

        if (hover_macros) {
            for (var i = 0; i < hover_macros.length; i++) {
                var attrs = hover_macros[i].attributes;
                var macro = hover_macros[i].macro;
                var advance = (attrs.advance === 'true' || attrs.advance !== undefined) ? 1 : 0;
                var type_attr = (attrs.type !== undefined) ? attrs.type : 'candle';

                var ty = {candle: 'c', line: 'l'};
                var type = ty[type_attr];

                var tm = {daily: 'd', weekly: 'w', monthly: 'm'};
                var timeframe = 'd';
                timeframe = attrs.timeframe !== undefined ? tm[attrs.timeframe] : 'd';

                if (timeframe == 'm' || timeframe == 'w') {
                    type = 'c';
                    timeframe = 'd';
                }

                if (attrs.symbol != undefined)
                {
                    var tag = '<a href="#" id="finviz-link" title="<iframe noresize=noresize scrolling=no height=340 frameborder=0 style=width:100vw;height:340; src=https://finviz.com/chart.ashx?t=' + attrs.symbol + '&ty=' + type + '&ta=' + advance + '&p=' + timeframe + '&s=l></iframe>" rel="finviz-tooltip" style="white-space: nowrap;">' + attrs.symbol + '</a>';
                    text = text.replace(macro, tag);
                }
            }
        }
        $('[itemprop="articleSection"]')[0].innerHTML = text;
    }
    processFinvizText();
}
finviz_render();