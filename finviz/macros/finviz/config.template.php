<?php
/**
 * Finviz - Configuration
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
if (!defined('SCHLIX_VERSION'))
    die('No Access');
?>
<p><?= ___('This macro is useful to embed a finviz chart in the middle of content text') ?></p>
<p><?= ___('More information about Finviz <a href="https://finviz.com/" target="_blank">Click Here</a>.') ?></p>

<h3><?= ___('Usage') ?></h3>
<h4><?= ___('Syntax') ?></h4>
<p><?= ___('Default') ?>: <code style="font-size:large">{insertstockquote <strong>symbol</strong>=<em>&quot;AAPL&quot;</em>}</code></p>
<p><?= ___('Hover') ?>: <code style="font-size:large">{stockquotehover <strong>symbol</strong>=<em>&quot;AAPL&quot;</em>}</code></p>
<p><?= ___('Advance') ?>: <code style="font-size:large">{insertstockquote <strong>symbol</strong>=<em>&quot;AAPL&quot;</em> <strong>type</strong>=<em>&quot;candle&quot;</em> <strong>advance</strong>=<em>&quot;false&quot;</em> <strong>timeframe</strong>=<em>&quot;daily&quot;</em>}</code></p>
<h4><?= ___('Available Type value:') ?></h4>
<ul>
    <li>candle</li>
    <li>line</li>
</ul>
<h4><?= ___('Available Timeframe value:') ?></h4>
<ul>
    <li>daily</li>
    <li>weekly</li>
    <li>monthly</li>
</ul>