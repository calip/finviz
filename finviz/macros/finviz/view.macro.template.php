<?php
/**
 * Finviz
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
if (!defined('SCHLIX_VERSION')) die('No Access');
$this->CSS('finviz.tooltips.css');
$this->JAVASCRIPT('finviz.tooltips.js');
?>
<?php if ($hover) : ?>
    <a href="javascript:void(0)" id="finviz-link" title="<iframe noresize='noresize' scrolling='no' height='340' frameborder='0' style='width:100vw;height:340;' src='https://finviz.com/chart.ashx?t=<?= ___($symbol)?>&ty=<?= ___($type)?>&ta=<?= ___($advance)?>&p=<?= ___($timeframe)?>&s=l'></iframe>" rel="finviz-tooltip" style="white-space: nowrap;"><?= ___($title)?></a>    
<?php else: ?>
    <img id="finviz-chart-<?= ___($symbol)?>" src="https://finviz.com/chart.ashx?t=<?= ___($symbol)?>&ty=<?= ___($type)?>&ta=<?= ___($advance)?>&p=<?= ___($timeframe)?>&s=l" alt="<?= ___($title)?>" height="340" border="0">
<?php endif; ?>