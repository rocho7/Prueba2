<?php

	$num_videos_found = count($xml->entry); 
	if ($num_videos_found > 0) {
		for ($i = 0; $i < min($num_videos_found, NUM_VIDEOS); $i++) {
			$entry = $xml->entry[$i];
			$attrs = $media->group->thumbnail[0]->attributes();

			echo '<td style="vertical-align:bottom; text-align:center" width="' . (100 / NUM_VIDEOS) . '%">
		echo '</tr></table>';
	else {