<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::paginate(10)->withQueryString();

        $categories->getCollection()->transform(fn($category) => [
            'id' => $category->id,
            'name' => $category->name,
            'description' => $category->description,
            'slug' => $category->slug,
            'image' => $category->image
                ? Storage::url($category->image)
                : null,
            'created_at' => $category->created_at->format('d M Y'),
        ]);
        
        return Inertia::render('categories/index', [
            // 'categories' => Category::paginate(10)->withQueryString(),
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        try {
            $categoryImagePath = null;

            if ($request->hasFile('image')) {
                $categoryImagePath = $request->file('image')->store('categories', 'public');
            } 
            $category = Category::create([
                'name' => $request->name,
                'description' => $request->description,
                'image' => $categoryImagePath,
                'slug' => Str::slug($request->name),
            ]);
            if ($category) {
                return redirect()->route('categories.index')->with('success', 'Category created successfully.');
            }
            return redirect()->route('categories.index')->with('error', 'Unable to create category. Please try again.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Error creating category');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}