<?php	define('YOUTUBE_URL', 'https://www.youtube.com/feeds/videos.xml?user=aliensabductedme'); // Carsten's link	define('NUM_VIDEOS', 5);
	$xml = simplexml_load_file(YOUTUBE_URL);
	$num_videos_found = count($xml->entry); 
	if ($num_videos_found > 0) {		echo '<table><tr>';		
		for ($i = 0; $i < min($num_videos_found, NUM_VIDEOS); $i++) {
			$entry = $xml->entry[$i];			$media = $entry->children('http://search.yahoo.com/mrss/'); 						$title = $media->group->title;			$desc = $media->group->description;			$video_url = $media->group->content->attributes();			$views = number_format(intval($media->group->community->statistics->attributes()), 0, '', ',');  // converts views to INTEGER & adds a comma;
			$attrs = $media->group->thumbnail[0]->attributes();			$thumbnail_url = $attrs['url']; 

			echo '<td style="vertical-align:bottom; text-align:center" width="' . (100 / NUM_VIDEOS) . '%">						<a href="' . $video_url . '">' . $title . '<br />						<span style="font-size:smaller">' . $views . ' views</span><br />						<img src="' . $thumbnail_url . '" /></a><br />						<p style="font-size:smaller">' . $desc . ' </p></td>';		}
		echo '</tr></table>';	}
	else {		echo '<p>Sorry, no videos were found.</p>';	}?>